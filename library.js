// From http://www.crockford.com/javascript/www_svendtofte_com/code/curried_javascript/index.html
var curry = function (func, args, space) {
    var n  = func.length - args.length; //arguments still to come
    var sa = Array.prototype.slice.apply(args); // saved accumulator array

    function accumulator(moreArgs, sa, n) {
        var saPrev = sa.slice(0); // to reset
        var nPrev  = n; // to reset

        for(var i = 0; i < moreArgs.length; i++, n--) {
            sa[sa.length] = moreArgs[i];
        }

        if ((n - moreArgs.length) <= 0) {
            var res = func.apply(space, sa); // reset vars, so curried function can be applied to new params.
            sa = saPrev;
            n  = nPrev;
            return res;
        } else {
            return function () {
                // arguments are params, so closure bussiness is avoided.
                return accumulator(arguments, sa.slice(0), n);
            };
        }
    }

    return accumulator([], sa, n);
};

/**
 * Library functions
 */
var noOp = function () {};

var isArray = function (val) {
    return Object.prototype.toString.call( someVar ) === "[object Array]";
};

var isObject = function (val) {
    return val !== null && typeof val === "object";
};

var isString = function (val) {
    return typeof val == 'string' || val instanceof String;
};

var isNumber = function (val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
};

var forEach = curry(function (func, items) {
    var i;

    items = items || [];
    func = func || noOp;

    if (isArray(items)) {
        for (i = 0, l = items.length; i < l; i++) {
            func(items[i]);
        }
    } else {
        for (i in object) {
            if (object.hasOwnProperty(i)) {
                func(items[i]);
            }
        }
    }
});

var sortBy = curry(function (sortBy, arr) {
    return arr.sort(function (a, b) {
        return a[sortBy] >= b[sortBy] ? 1 : -1;
    });
});

var prop = curry(function (prop, item) {
    return item[prop];
});

var toPairs = function (object) {
    var arr = [];

    for (var i in object) {
        if (object.hasOwnProperty(i)) {
            arr.push([i, object[i]]);
        }
    }

    return arr;
};

module.exports = {
    forEach: forEach,
    isString: isString,
    isNumber: isNumber,
    sortBy: sortBy,
    prop: prop,
    toPairs: toPairs,
    noOp: noOp
};