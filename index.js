/**
 * Write a program( in Java or JavaScript) which takes in a string as an input and returns true
 * if all the parentheses in the string are properly closed and nested.
 */

// The first argument is the input text
const lisp = process.argv[2];

const areParenthesesNestedProperly = function (lispCode) {
    let openParens = []; // Will be represented as a stack
    let insideQuotes = false;
    let insideComments = false;
    lispCode.replace("\r\n", "\n"); // Replace Windows line endings with UNIX line endings for consistency

    for (const char of lispCode) {
        if (!insideQuotes && char === ";") {
            insideComments = true;
        }
        if (insideComments && char === "\n") {
            insideComments = false;
        }
        if (!insideComments && char === "\"") {
            insideQuotes = !insideQuotes;
        }
        if (!insideQuotes && !insideComments) {
            if (char === "(") {
                openParens.push("(");
            } else if (char === ")") {
                openParens.pop();
            }
        }
    }
    return openParens.length === 0;
}

console.log(areParenthesesNestedProperly(lisp));

module.exports = {
    areParenthesesNestedProperly
}

return module.exports;