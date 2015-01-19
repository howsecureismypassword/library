"use strict";

// Currying function
var curry = function curry(fn) {
    var length = fn.length,

        recurry = function (prevArgs) {
            return function() {
                var args = prevArgs.concat([].slice.call(arguments));

                if (args.length < length) {
                    return recurry(args);
                } else {
                    return fn.apply(this, args);
                }
            };
        };

  return recurry([]);
};

/**
 * Library functions
 */
var noOp = function () {};

var isFunction = function (val) {
    return val && {}.toString.call(val) === "[object Function]";
};

var isArray = function (val) {
    return Object.prototype.toString.call(val) === "[object Array]";
};

var isObject = function (val) {
    return val !== null && typeof val === "object";
};

var isString = function (val) {
    return typeof val === "string" || val instanceof String;
};

var isNumber = function (val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
};

var forEach = curry(function (func, items) {
    var i, l;

    if (!isFunction(func)) {
        throw new Error("forEach takes a function as the first value");
    }

    items = items || [];
    func = func || noOp;

    if (isArray(items)) {
        for (i = 0, l = items.length; i < l; i++) {
            if (func(items[i], i) === false) {
                break;
            }
        }
    } else {
        for (i in items) {
            if (items.hasOwnProperty(i)) {
                if (func(items[i], i) === false) {
                    break;
                }
            }
        }
    }
});

var map = curry(function (func, item) {
    var arr = [];

    if (!isFunction(func)) {
        throw new Error("map takes a function as the first value");
    }

    forEach(function (item, key) {
        arr.push(func(item, key));
    }, item);

    return arr;
});

var reduce = curry(function (func, accumulator, items) {
    if (!isFunction(func)) {
        throw new Error("reduce takes a function as the first value");
    }

    forEach(function (item, key) {
        accumulator = func(accumulator, item, key);
    }, items);

    return accumulator;
});

var sortBy = curry(function (sortBy, arr) {
    return arr.sort(function (a, b) {
        return a[sortBy] >= b[sortBy] ? 1 : -1;
    });
});

var prop = curry(function (prop, item) {
    return item.hasOwnProperty(prop) ? item[prop] : null;
});

var toPairs = function (object) {
    return map(function (item, i) {
        return [i, item];
    }, object);
};

var defaults = curry(function (defaults, options) {
    forEach(function (value, key) {
        if (!defaults.hasOwnProperty(key)) {
            throw new Error("Invalid key: " + key);
        }
    }, options);

    var results = {};

    forEach(function (value, key) {
        results[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
    }, defaults);

    return results;
});

var filter = curry(function (func, items) {
    return reduce(function (acc, value, key) {
        if (func(value, key)) {
            acc[key] = value;
        }

        return acc;
    }, isArray(items) ? [] : {}, items);
});

var some = curry(function (func, items) {
    var some = false;

    forEach(function (item) {
        if (func(item)) {
            some = true;
            return false;
        }
    }, items);

    return some;
});

var output = function (val) {
    return function () {
        return val;
    };
};

module.exports = {
    curry: curry,
    isFunction: isFunction,
    isObject: isObject,
    isArray: isArray,
    isString: isString,
    isNumber: isNumber,
    sortBy: sortBy,
    prop: prop,
    forEach: forEach,
    map: map,
    reduce: reduce,
    toPairs: toPairs,
    defaults: defaults,
    output: output,
    filter: filter,
    some: some,
    noOp: noOp
};