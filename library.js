var curry = require("curry");

var noOp = function () {};

var forEach = curry(function (func, items) {
    items = items || [];
    func = func || noOp;

    for (var i = 0, l = items.length; i < l; i++) {
        func(items[i]);
    }
});

var isString = curry(function (val) {
    return typeof val == 'string' || val instanceof String;
});

var isNumber = curry(function (val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
});

var sortBy = curry(function (sortBy, arr) {
    return arr.sort(function (a, b) {
        return a[sortBy] >= b[sortBy] ? 1 : -1;
    });
});

var prop = curry(function (prop, item) {
    return item[prop];
});

var toPairs = curry(function (object) {
    var arr = [];

    for (i in object) {
        if (object.hasOwnProperty(i)) {
            arr.push([i, object[i]]);
        }
    }

    return arr;
});

module.exports = {
    forEach: forEach,
    isString: isString,
    isNumber: isNumber,
    sortBy: sortBy,
    prop: prop,
    toPairs: toPairs,
    noOp: noOp
};