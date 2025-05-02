// This file contains intentional ESLint errors to test VS Code highlighting

// Missing semicolon (should be highlighted)
const testVar = 10

// Double quotes instead of single quotes (should be highlighted)
const message = "This should use single quotes";

// Missing return type (should be highlighted)
function add(a: number, b: number) {
  return a + b;
}

// Missing parameter types (should be highlighted)
function multiply(a, b) {
  return a * b;
}

// Export to make sure TypeScript processes this file
export { testVar, message, add, multiply };
