module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    // "extends": "eslint:recommended",
    extends: "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-param-reassign": 0,
        "no-console": 0,
        "class-methods-use-this": 1,
        'import/no-extraneous-dependencies': 0
    }
}
