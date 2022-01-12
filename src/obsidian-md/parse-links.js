const fs = require('fs');
const fse = require('fs-extra');

const indexProject = require('../gitbook/index-project');

// Page links map
const pageLinks = {};

/**
 *  Get page name from original filename
 * 
 *  @param filename {String} Filename to turn into page name
 *  @return {String} Page name (without stuff like extensions)
 */
function pageName(filename) {
  return filename.replace('.md', '');
}

/**
 *  Search for page link in node index
 * 
 *  @param page {String} Page name to find link
 *  @param index {Object} Project index to find into
 *  @return {String} Path to the page
 */
function findPageLink(page, index) {
  const nodes = Object.keys(index);
  
  // ToDo: Is there a / in page name? 

  for (let i = 0; i < nodes.length; i += 1) {
    const node = index[nodes[i]];

    // Deep search in folders
    if (typeof node.content !== 'undefined') {
      const found = findPageLink(page, node.content);

      if (found) {
        return `${nodes[i]}/${found}`;
      }
    }

    // Check page name
    if (pageName(node.name) === page) {
      return nodes[i];
    }
  }

  return false;
}

/**
 *  Get a page link
 * 
 *  @param page {String} Page name to find link
 *  @param index {Object} Project index to find into
 *  @return {String} Path to the page
 */
function pageLink(page, index) {
  if (pageLinks[page]) {
    return pageLinks[page];
  }

  const link = findPageLink(page, index);
  pageLinks[page] = link;
  
  return link;
}

/**
 *  Parse page links in a file
 */
async function parsePageLinks(filename, index) {
  try {
    // If is not a markdown file, jump to the next file
    if (filename.indexOf('.md') === -1) {
      // console.log('File is not markdown. Skipping.');
      return false;
    }

    // If file dont exist, jump to the next file
    const exists = await fse.pathExists(filename);
    if (!exists) {
      return false;
    }

    // Get page content
    let pageText = fs.readFileSync(filename, 'utf8');

    // If not content, jump. It might be an empty page.

    // Regex: Find "[[ SOMETHING ]]" (without quotes)
    const pageLinkRegex = /(\[\[)(\s*\b)([^\[\]]*)(\b\s*)(\]\])/g;
    const links = pageText.match(pageLinkRegex);
    const uniqueLinks = [...new Set(links)];

    // If links, replace them...
    for (let i = 0; i < uniqueLinks.length; i += 1) {
      const pageName = uniqueLinks[i].replace('[[', '').replace(']]', '');
      const pageLinkPath = pageLink(pageName, index);
      const mdlink = `[${pageName}](${pageLinkPath})`
      
      // Unable to use .replace() with RegEx because of [] chars
      pageText = pageText.split(uniqueLinks[i]).join(mdlink);
    }

    // ...And store the new file
    fs.writeFileSync(filename, pageText);

  } catch (err) {
    console.error(err)
  }
}

/**
 *  Parse links in all pages for a given index
 * 
 *  @param index {Object} Project index to find into
 */
async function parseLinks(folder, index, rootIndex) {
  let newIndex = { ...index };
  let originalIndex = { ...rootIndex }

  if (!index) {
    newIndex = indexProject(folder);
  }
  if (!rootIndex) {
    originalIndex = newIndex;
  }

  try {
    const nodes = Object.keys(newIndex);

    for (let i = 0; i < nodes.length; i += 1) {
      const node = newIndex[nodes[i]];

      // If is folder, go recursive
      if (typeof node.content !== 'undefined') {
        await parseLinks(`${folder}/${nodes[i]}`, node.content, originalIndex);  
      }

      // Parse page links
      console.log(`~~> ${folder}/${nodes[i]}`)
      await parsePageLinks(`${folder}/${nodes[i]}`, originalIndex);
    }

    console.log('> First level page links created!');

    return pageLinks;
  } catch (e) {
    console.error('Error: Unable to rewrite Obsidian page links');
    console.error(e);
    return null;
  }
}

module.exports = parseLinks;
