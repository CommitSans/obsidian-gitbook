let settings = {
  obsidianProject: '../obsidian',
  gitbookProject: '../gitbook',
};

try {
  const settingsFile = require('./settings.json');

  settings = {
    ...settings,
    ...settingsFile,
  };
  console.log('Custom settings loaded from settings.json');
} catch {
  console.log('Settings not found. Using default settings');
}

// export default settings;
module.exports = settings;
