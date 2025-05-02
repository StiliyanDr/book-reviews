// This file contains intentional ESLint errors to test VS Code integration

// Missing semicolon
const testVar = 10

// Double quotes instead of single quotes
const message = "This should use single quotes";

// Missing return type
function add(a: number, b: number) {
  return a + b;
}

// Missing parameter types
function multiply(a, b) {
  return a * b;
}

// Export to make sure TypeScript processes this file
export { testVar, message, add, multiply };
