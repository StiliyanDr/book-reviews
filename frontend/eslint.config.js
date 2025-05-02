const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angulareslint = require('@angular-eslint/eslint-plugin');
const angulareslintTemplate = require('@angular-eslint/eslint-plugin-template');
const importPlugin = require('eslint-plugin-import');

module.exports = [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ignores: ['**/node_modules/**', '**/dist/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@angular-eslint': angulareslint,
            '@angular-eslint/template': angulareslintTemplate,
            'import': importPlugin,
        },
        rules: {
            // Angular specific rules
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
            '@typescript-eslint/explicit-member-accessibility': ['off'],
            '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/typedef': ['error', {
                arrowParameter: false,
                memberVariableDeclaration: true,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: true,
                variableDeclarationIgnoreFunction: false,
            }],

            // General rules
            'no-console': ['warn'],
            'curly': ['error'],
            'eqeqeq': ['error'],
            'no-throw-literal': ['error'],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { avoidEscape: true }],

            // Code style rules
            'indent': ['error', 4, {
                'SwitchCase': 1,
                'VariableDeclarator': 1,
                'outerIIFEBody': 1,
                'MemberExpression': 1,
                'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
                'FunctionExpression': { 'parameters': 1, 'body': 1 },
                'CallExpression': { 'arguments': 1 },
                'ArrayExpression': 1,
                'ObjectExpression': 1,
                'ImportDeclaration': 1,
                'flatTernaryExpressions': false,
                'ignoreComments': false
            }],

            // Naming convention rules
            'camelcase': ['warn', { properties: 'always' }],
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'default',
                    format: ['camelCase']
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE']
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow'
                },
                {
                    selector: 'memberLike',
                    modifiers: ['private'],
                    format: ['camelCase'],
                    leadingUnderscore: 'allow'
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase']
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    prefix: ['I']
                },
                {
                    selector: 'enum',
                    format: ['PascalCase'],
                    prefix: ['E']
                }
            ],

            'import/order': ['error', {
                'groups': [
                    'builtin',      // Node.js built-in modules
                    'external',     // npm packages
                    'internal',     // Paths that start with '/'
                    ['parent', 'sibling'], // Paths that start with '..'
                    'index',        // Paths that are '.'
                    'object',       // TypeScript path mapping
                    'type'          // Type imports
                ],
                'pathGroups': [
                    // Angular packages go first
                    {
                        'pattern': '@angular/**',
                        'group': 'external',
                        'position': 'before'
                    },
                    // Then other external packages
                    {
                        'pattern': '@/**',
                        'group': 'external',
                        'position': 'after'
                    }
                ],
                'pathGroupsExcludedImportTypes': ['@angular/**'],
                'newlines-between': 'always',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                }
            }],
            'import/no-duplicates': 'error',
        },
    },
    {
        files: ['**/*.html'],
        plugins: {
            '@angular-eslint/template': angulareslintTemplate,
        },
        rules: {
            // Using only rules that are available in the plugin
            '@angular-eslint/template/no-any': 'error'
        },
    },
];
