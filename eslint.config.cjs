const json = require('eslint-plugin-json');
const header = require('eslint-plugin-header');
const globals = require('globals');
const js = require('@eslint/js');

const {
    FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [...compat.extends('eslint:recommended'), {
    ignores: [
        'node_modules/'
    ],
    plugins: {
        json,
        header
    },
    languageOptions: {
        globals: {
            ...globals.node,
            __dirname: true,
            require: true,
            module: true,
            process: true,
            Buffer: true,
            describe: true,
            context: true,
            before: true,
            after: true
        },

        ecmaVersion: 2020,
        sourceType: 'commonjs'
    },
    rules: {
        'header/header': ['warn', 'block', {
            'pattern': 'Copyright \\d{4}, CompanyName, Inc.  All rights reserved.',
            'template': 'Copyright 2024, CompanyName, Inc.  All rights reserved.'
        }]
    },
}];
