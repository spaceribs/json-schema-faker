import deref = require('deref');

import container = require('../class/Container');
import traverse = require('./traverse');
import random = require('./random');
import utils = require('./utils');

function mixRefs($, sub, seen, reduce): void {
  if (Array.isArray(sub.allOf)) {
    var schemas: JsonSchema[] = sub.allOf;

    delete sub.allOf;

    // this is the only case where all sub-schemas
    // must be resolved before any merge
    schemas.forEach(function(schema: JsonSchema) {
      utils.merge(sub, reduce(schema));
    });
  }

  if (Array.isArray(sub.oneOf || sub.anyOf)) {
    var mix = sub.oneOf || sub.anyOf;

    delete sub.anyOf;
    delete sub.oneOf;

    utils.merge(sub, random.pick(mix));
  }

  if (typeof sub.$ref === 'string') {
    var id = sub.$ref;

    delete sub.$ref;

    if (!seen[id]) {
      // TODO: this should be configurable
      seen[id] = random.number(1, 5);
    }

    seen[id] -= 1;

    if (seen[sub.$ref] <= 0) {
      delete sub.$ref;
    }

    utils.merge(sub, $.util.findByRef(id, $.refs));
  }
}

function isKey(prop: string): boolean {
  return prop === 'enum' || prop === 'required' || prop === 'definitions';
}

// TODO provide types
function run(schema, refs?, ex?) {
  var $ = deref();

  try {
    var seen = {};

    return traverse($(schema, refs, ex), [], function reduce(sub) {
      do {
        mixRefs($, sub, seen, reduce);
      } while (sub.$ref || sub.oneOf || sub.anyOf || sub.allOf);

      for (var prop in sub) {
        if ((Array.isArray(sub[prop]) || typeof sub[prop] === 'object') && !isKey(prop)) {
          sub[prop] = reduce(sub[prop]);
        }
      }

      return sub;
    });
  } catch (e) {
    if (e.path) {
      throw new Error(e.message + ' in ' + '/' + e.path.join('/'));
    } else {
      throw e;
    }
  }
}

export = run;
