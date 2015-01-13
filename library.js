"use strict";

// Currying function
var curry = require("curry");

/**
 * Library functions
 */
var noOp = function () {};

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

    items = items || [];
    func = func || noOp;

    if (isArray(items)) {
        for (i = 0, l = items.length; i < l; i++) {
            func(items[i], i);
        }
    } else {
        for (i in items) {
            if (items.hasOwnProperty(i)) {
                func(items[i], i);
            }
        }
    }
});

var map = curry(function (func, item) {
    var arr = [];

    forEach(function (item, value) {
        arr.push(func(item, value));
    }, item);

    return arr;
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

module.exports = {
    isObject: isObject,
    isArray: isArray,
    isString: isString,
    isNumber: isNumber,
    sortBy: sortBy,
    prop: prop,
    forEach: forEach,
    map: map,
    toPairs: toPairs,
    noOp: noOp
};