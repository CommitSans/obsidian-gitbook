const TYPE_DIR = 'dir';
const TYPE_FILE = 'file';

/**
 *  Transform a name to GitBook style naming (just a-z, 0-9 and dashes)
 * 
 *  @param name {String} Name to parse
 *  @param type {String} Type of file to parse the name
 *  @return {String} Parsed name
 */
function parseName(name, type) {
  let regex = /[^a-z0-9 ]/g
  if (type === TYPE_FILE) {
    regex = /[^a-z0-9. ]/g
  }

  return name.toLowerCase().replace(regex, "").replace(/\s+/g, "-");
}

/**
 *  Transform a name and type into a Node structure
 * 
 *  @param name {String} Node name
 *  @param type {String} Node type
 *  @return {Object} A node, with the type and name props.
 */
function buildNode(name, type) {
  // ToDo: If invalid type, throw error;

  return {
    type,
    name,
  };
}

// export default {
module.exports = {
  TYPE_FILE,
  TYPE_DIR,
  parseName,
  buildNode,
};
