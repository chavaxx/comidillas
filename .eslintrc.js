module.exports = {
    env:{
        browser: true,
        node: true,
        es2020: true,
    },
    extends: ['airbnb-base'],
    parserOption: {
        sourceType: 'module',
        ecmaVersion: 11,
    },
    rules:{
        'no-console': 0,
    },
};