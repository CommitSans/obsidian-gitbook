const fse = require('fs-extra');

/**
 *  Copy obsidian project to gitbook 
 */
async function copyProject(obsidian, gitbook) {
  try { 
    // Clear GitBook directory
    await fse.emptyDir(gitbook);

    // Copy Obsidian project
    await fse.copySync(obsidian, gitbook);
    console.log('> GitBook folder created.');

    // Remove Obsidian config files
    await fse.remove(`${gitbook}/.obsidian`);
    console.log('> Removed Obsidian files');

    // Remove Git files
    const gitPaths = ['.git', '.gitignore', '.gitattributes'];

    for (var i = 0; i < gitPaths.length; i++) {
      const path = gitPaths[i];

      const fullPath = `${gitbook}/${path}`;
      const exists = await fse.pathExists(fullPath);
      if (exists) {
        await fse.remove(fullPath);
      }
    }
    console.log('> Removed Git-related files');

    return true;
  } catch (e) {
    console.error('> Error copying Obsidian project to GitBook folder');
    console.error(e);
    return false;
  }
}

// export default copyProject;
module.exports = copyProject;
