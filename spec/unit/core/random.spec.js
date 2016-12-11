var random = require('../../../lib/core/random');

describe("Random", function() {
  describe("pick function", function() {
    it('picks a random element from an array.', function() {
      var pool = ['one', 'two', 'three'];
      var result = random.pick(pool);
      expect(pool.indexOf(result)).toBeGreaterThan(-1);
    });
  });

  describe("shuffle function", function() {
    it('shuffles an array randomly.', function() {
      var pool = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
      var result1 = random.shuffle(pool);
      var result2 = random.shuffle(pool);

      var same = true;
      for (var i = 0; i < pool.length; i++) {
        if (pool[i] !== result1[i] || pool[i] !== result2[i]) {
          same = false;
          break;
        }
      }

      expect(same).toBeFalsy();
    });
  });

  describe("number function", function() {
    it('generates a random number with defaults.', function() {
      var result = random.number();
      expect(result).toBeGreaterThan(-100);
      expect(result).toBeLessThan(100);
    });

    it('generates a random number with a custom range.', function() {
      var result = random.number(200, 300);
      expect(result).toBeGreaterThan(200);
      expect(result).toBeLessThan(300);
    });
  });

  describe("boolean function", function() {
    it('generates a random boolean value.', function() {
      var result = random.boolean();
      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.any(Boolean));
    });

    it('always generates true if it\'s weighted at 1.0', function() {
      var result = random.boolean(1);
      expect(result).toBe(true);
    });

    it('always generates false if it\'s weighted at 0.0', function() {
      var result = random.boolean(0);
      expect(result).toBe(false);
    });
  });
});
