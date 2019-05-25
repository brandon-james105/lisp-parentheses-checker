var assert = require("assert");
const parenthesesValidator = require("./lisp-parentheses-checker").areParenthesesNestedProperly;

describe("Input with parentheses that match", () => {
  it("should return true because the parentheses match", () => {
    assert.equal(parenthesesValidator("((2 * 2) (3 * 5))"), true);
  });
});
describe("Input with parentheses that do not match", () => {
  it("should return false because the parentheses don't match", () => {
    assert.equal(parenthesesValidator("((2 * 2) (3 * 5)"), false);
  });
});
describe("Code with open parentheses in a comment", () => {
  const testInput = `((1 + 1) ; (code with a parenthesis in a comment (
)`;
  it("should return true when a parentheses are in a comment line but the rest of the input is valid", () => {
    assert.equal(parenthesesValidator(testInput), true);
  });
});
describe("Code with open parentheses and a semicolon in quotes", () => {
  const testInput = `((1 + 1) "; (code with a parenthesis in a comment (")`;
  it("should return true when a parentheses are quotes and the rest of the input is valid", () => {
    assert.equal(parenthesesValidator(testInput), true);
  });
});
describe("Code with valid code following an empty line after a comment should be valid", () => {
  const testInput = `(
    (5 * 2) ;; This is a comment
    (10 * 5)
)`;
  it("should return true when a parenthesis is in a comment line", () => {
    assert.equal(parenthesesValidator(testInput), true);
  });
});
describe("Code with open parentheses in a comment", () => {
  it("should return false when an open parenthesis is outside of a comment and a closed parenthesis is inside", () => {
    assert.equal(
      parenthesesValidator("( ; (code with open parentheses in a comment ()"),
      false
    );
  });
});
describe("Code with open parentheses in quotes", () => {
  it("should return true when a parenthesis is in quotes but there are surrounding matching parentheses", () => {
    assert.equal(
      parenthesesValidator('("(code with open parentheses in quotes (")'),
      true
    );
  });
});
describe("Code with semicolons in quotes", () => {
  it("should return true when a parenthesis is in quotes but there are surrounding matching parentheses", () => {
    assert.equal(
      parenthesesValidator('("(code ; with open parentheses in quotes (")'),
      true
    );
  });
});
describe("Multiline double quotes containing parentheses should not make open parentheses valid again", () => {
  const testInput = `((11 * 11)
        "
        (101 * 210
        "
        (101 * 210)
    )`;
  it("should return true when a quote spans multiple lines and an open parentheses is in the quotes", () => {
    assert.equal(parenthesesValidator(testInput), true);
  });
});
