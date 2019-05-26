/**
 * Write a program( in Java or JavaScript) which takes in a string as an input and returns true
 * if all the parentheses in the string are properly closed and nested.
 */

// The first argument is the input text

var areParenthesesNestedProperly = require("./lisp-parentheses-checker");

console.log(areParenthesesNestedProperly(process.argv[2]));
