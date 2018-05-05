module.exports = {
    "extends": ["airbnb-base", "plugin:jest/recommended"],
    "env": {
        "browser": true,
        "node": true,
        "jest": true,
        "jquery": true
    },
    "plugins": ["jest"],
    "rules": {
        "jest/valid-expect-in-promise": "error"
    }
};
