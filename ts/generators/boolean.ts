import random = require('../core/random');

/**
 * Generates randomized boolean value.
 *
 * @returns {boolean}
 */
function booleanGenerator() {
  return random.boolean();
}

export = booleanGenerator;
