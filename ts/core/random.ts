/// <reference path="../index.d.ts" />

/**
 * Returns random element of a collection
 *
 * @param collection
 * @returns {T}
 */
function pick<T>(collection: T[]): T {
  return collection[Math.floor(Math.random() * collection.length)];
}

/**
 * Returns shuffled collection of elements
 *
 * @param collection
 * @returns {T[]}
 */
function shuffle<T>(collection: T[]): T[] {
  let tmp: T,
    key: number,
    copy: T[] = collection.slice(),
    length: number = collection.length;

  for (; length > 0;) {
    key = Math.floor(Math.random() * length);
    // swap
    tmp = copy[--length];
    copy[length] = copy[key];
    copy[key] = tmp;
  }

  return copy;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * @see http://stackoverflow.com/a/1527820/769384
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random true or false.
 * @param {number} [weight=0.5] - Defaults to 0.5, increase this value to increase the likehood of true results.
 * @returns {boolean}
 */
function boolean(weight = 0.5) {
  return Math.random() < weight;
}

/**
 * Generates random number according to parameters passed
 *
 * @param {number} [min=-100] - Minimum random value
 * @param {number} [max=100] - Maximum random value
 * @returns {number}
 */
function number(min = -100, max = 100): number {

  if (max < min) {
    max += min;
  }

  return getRandomInt(min, max);
}

export = {
  pick: pick,
  shuffle: shuffle,
  number: number,
  boolean: boolean
};
