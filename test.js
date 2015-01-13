/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var L = require("./library.min");

/**
 * Tests
 */
buster.testCase("library", {
    'isArray': {
        'array': function () {
            assert.same(L.isArray([1, 2, 3]), true);
        },

        'string': function () {
            assert.same(L.isArray("test"), false);
        },

        'object': function () {
            assert.same(L.isArray({ "test": "hello" }), false);
        },

        'false': function () {
            assert.same(L.isArray(false), false);
        }
    },
    'map': {
        'basic': function () {
            assert.equals(L.map(function (item) {
                return item * 2;
            }, [1, 2, 3]), [2, 4, 6]);
        },
        'object': function () {
            assert.equals(L.map(function (value, key) {
                return key + value;
            }, { "a": "x", "b": "y", "c": "z"}), ["ax", "by", "cz"]);
        },
        'curried': function () {
            var double = L.map(function (item) {
                return item * 2;
            });

            assert.equals(double([1, 2, 3]), [2, 4, 6]);
        },
    }
});