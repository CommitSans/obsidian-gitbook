const copyProject = require('./gitbook/copy');
const indexProject = require('./gitbook/index-project');
const renameProject = require('./gitbook/rename');
const summarize = require('./gitbook/summary');
// const obsidianToMD = require('./gitbook/obsidian');

/* Load settings (if exist) */
let settings = {
  obsidianProject: '../obsidian',
  gitbookProject: '../gitbook',
};

try {
  settings = require('../settings.json');
  console.log('Settings loaded from settings.json');
} catch {
  console.log('Settings not found. Using default settings');
}


/**
 *  Main function
 */
async function main() {
  console.log('Building GitBook from Obsidian.');
  
  // Copy Obsidian project to GitBook
  const copied = await copyProject(settings.obsidianProject, settings.gitbookProject);
  if (!copied) {
    console.error('Aborting.');
    return false;
  }

  /* Build an index of the project files */
  const index = await indexProject(settings.gitbookProject);
  // console.log(index)

  /* Rename the files and folders */
  const renamed = await renameProject(settings.gitbookProject, index);
  if (!renamed) {
    console.error('Unable to rename the project. Aborting.');
    return false;
  } else {
    console.log('> Project successfully renamed.');
  }

  /* Make the SUMMARY.md */
  const summarized = await summarize(settings.gitbookProject, index);
  if (!summarized) {
    console.error('Aborting.');
    return false;
  }
  // ToDo: Config settings for letting GitBook generate the file
  // console.log('> Summary ommited. GitBook should be able to make it...');

  /* Convert the Obsidian syntax to markdown */
  // obsidianToMd(index);

  return true
}

/* Execute the code */
main();
