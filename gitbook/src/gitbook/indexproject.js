const { promises: { readdir } } = require('fs');

const utils = require('./utils/nodes');

const TYPE_DIR = utils.TYPE_DIR;
const TYPE_FILE = utils.TYPE_FILE;

/**
 *  Index files and folders in a given source (non recursively)
 * 
 *  @param source {String} Source to create the plain index
 *  @return {Object} An index of nodes for the current directory
 */
async function indexFolder(source) {
  const index = {}; 

  const dir = await readdir(source, { withFileTypes: true });

  const directories = dir.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  directories.forEach((dir) => {
    const parsedName = utils.parseName(dir, TYPE_DIR);
    index[parsedName] = utils.buildNode(dir, TYPE_DIR);
  });

  const files = dir.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
  files.forEach((file) => {
    const parsedName = utils.parseName(file, TYPE_FILE);
    index[parsedName] = utils.buildNode(file, TYPE_FILE);
  });

  return index;
}

/**
 *  Build an index of the project files (recursively)
 * 
 *  @param gitbook {String} GitBook source to create the project index
 *  @return {Object} An index of nodes for the project
 **/
async function indexProject(gitbook) {
  const index = await indexFolder(gitbook);

  // Index recursively over directories
  const directories = Object.keys(index).filter((node) => index[node].type === 'dir');

  for (let i = 0; i < directories.length; i += 1) {
    const node = await indexProject(`${gitbook}/${index[directories[i]].name}`);
    index[directories[i]].content = node;
  }

  return index;
}

module.exports = indexProject;
