import config from '@iobroker/eslint-config';

export default [
    ...config,
    {
        ignores: [
            '.dev-server/',
            '.scannerwork/**',
            'widgets/**',
            'gulpfile.js',
            'test/**/*.js',
            '*.config.mjs',
            'admin/words.js',
            'admin/i18n/**',
        ],
    },
    {
        rules: {
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-returns-description': 'off',
            'jsdoc/reject-any-type': 'off',
            'jsdoc/tag-lines': 'off',
        },
    },
];