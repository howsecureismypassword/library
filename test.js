"use strict";

/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var L = require("./library");

/**
 * Tests
 */
buster.testCase("library", {
    "isArray": {
        "array": function () {
            assert.same(L.isArray([1, 2, 3]), true);
        },

        "string": function () {
            assert.same(L.isArray("test"), false);
        },

        "object": function () {
            assert.same(L.isArray({ "test": "hello" }), false);
        },

        "false": function () {
            assert.same(L.isArray(false), false);
        }
    },
    "map": {
        "basic": function () {
            assert.equals(L.map(function (item) {
                return item * 2;
            }, [1, 2, 3]), [2, 4, 6]);
        },
        "object": function () {
            assert.equals(L.map(function (value, key) {
                return key + value;
            }, { "a": "x", "b": "y", "c": "z"}), ["ax", "by", "cz"]);
        },
        "curried": function () {
            var double = L.map(function (item) {
                return item * 2;
            });

            assert.equals(double([1, 2, 3]), [2, 4, 6]);
        },
    },
    "sortBy": {
        "basic": function () {
            assert.equals(L.sortBy("name", [{ "name": "bob"}, { "name": "adam"}]), [{ "name": "adam" }, { "name": "bob" }]);
        },

        "curried": function () {
            var sortByName = L.sortBy("name");
            assert.equals(sortByName([{ "name": "bob"}, { "name": "adam"}]), [{ "name": "adam" }, { "name": "bob" }]);
        },
    },
    "toPairs": {
        "basic": function () {
            assert.equals(L.toPairs({ "name1": "bob", "name2": "adam"}), [["name1", "bob"], ["name2", "adam"]]);
        },
    },
    "defaults": {
        "exception": function () {
            assert.exception(function () {
                L.defaults({
                    "a": 10,
                    "b": 12
                }, {
                    "c": 50
                });
            });
        },
        "basic": function () {
            assert.equals(L.defaults({
                "a": 10,
                "b": 50
            }, {
                "a": 20
            }), {
                "a": 20,
                "b": 50
            });
        },
    },
    "output": function () {
        var twelve = L.output(12);
        assert.same(twelve(), 12);
    }
});