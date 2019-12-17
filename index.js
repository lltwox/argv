/**
 * Helper function, that parses command line arguments
 *
 */

let argv = {

  /**
   * Map of argument to its original position
   *
   * @type {Array}
   */
  _positions: [],

  /**
   * Return value at the position
   *
   * @param {Number} index
   * @return {String}
   */
  pos: index => {
    if (index >= 0) return argv._positions[index];
    if (index < 0) return argv._positions[argv._positions.length + index];
  },

  /**
   * Get value as an array
   *
   * @param {String} key
   * @param [String] formatting function
   * @return {Array}
   */
  array: (key, format) => {
    if (!argv[key] || argv[key] === true) return [];

    let result;
    if (Array.isArray(argv[key])) {
      result = argv[key];
    } else {
      result = [argv[key]];
    }

    if (format) result = result.map(format);

    return result;
  },

  /**
   * Returns all values with keys starting with prefix
   *
   * @param {String} prefix
   * @return {Array}
   */
  prefix: prefix => {
    let result = {};
    for (const [key, value] of Object.entries(argv)) {
      if (key.startsWith(prefix)) {
        result[key] = value;
      }
    }

    return result;
  },

  /**
   * Returns all keys, starting with prefix
   *
   * @param {String} prefix
   * @return {Array}
   */
  prefixKeys: prefix => {
    return Object.keys(argv.prefix(prefix));
  }

};

(function() {
  let args = process.argv.slice(2);
  for (const arg of args) {
    let [key, value] = arg.split('=');

    if (!value) {
      argv[key] = true;
      if (!key.startsWith('-')) argv._positions.push(key);
    } else if (value.includes(',')) {
      argv[key] = value.split(',').filter(x => x);
    } else {
      argv[key] = value;
    }
  }
}());

module.exports = argv;