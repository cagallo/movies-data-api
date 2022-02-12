module.exports = {
    'env': {
        'node': true,
        'es6': true,
        'mocha': true,
    },
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 8,
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
        },
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'keyword-spacing': [
            'error',
        ],
        'object-curly-spacing': [
            'error',
            'always',
        ],
        'no-trailing-spaces': [
            'error',
        ],
        'curly': [
            'error',
        ],
        'multiline-comment-style': [
            'error',
            'separate-lines',
        ],
        'spaced-comment': [
            'error',
        ],
        'brace-style': 'error',
        'no-console': 'off',
    },
};
