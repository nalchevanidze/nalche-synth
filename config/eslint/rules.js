module.exports = {
    "indent": [
        "error", 
        "tab",
        {"SwitchCase": 1 }
    ],

    "linebreak-style": [
        "off",
        "windows"
    ],

    "quotes": [
        "error",
        "double"
    ],

    "semi": [
        "error",
        "always"
    ],

    "no-unused-vars": [
        "error",
        {
            "vars": "local",
            "args": "after-used",
            "ignoreRestSiblings": false
        }
    ],

    //best practices
    "class-methods-use-this":"error",
    "block-scoped-var" : "error",
    "curly": "error",
    "dot-notation": "error",
    "no-alert": "error",
    "eqeqeq": "error",
    "no-empty-function": "error",
    "no-extra-bind": "error",
    "no-extend-native": "error",
    "no-eval": "error",
    "no-eq-null": "error",
    "no-global-assign": "error",
    "no-lone-blocks": "error",
    "no-invalid-this": "error",
    "no-implied-eval": "error",
    "no-loop-func": "error",
  //  "no-magic-numbers": ["error", { "ignoreArrayIndexes": true } ],
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
   // "no-param-reassign": "error",
    "no-redeclare": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "radix":"error",
    "vars-on-top": "error",
    "no-restricted-globals": "error",
    "no-use-before-define": "error",
    "valid-jsdoc": "error",

    //stylish
    "no-bitwise":"error",
   // "no-mixed-operators": "error",
    "no-multiple-empty-lines": "error",
    "no-multi-assign": "error",

    //es6
    "no-var":"error",
    "prefer-rest-params": "error",
    "symbol-description":"error",

    //React
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-deprecated": "error",
  //  "react/no-set-state": "error",
    "react/self-closing-comp": ["error", {
        "component": true,
        "html": true
    }],
    "react/void-dom-elements-no-children": "error",

    // Complexity linter
    "max-statements": [2, 30 ],
    "max-statements-per-line": ["error", { "max": 1 }],
    "max-depth": [1, 5],
    "complexity": [ "error", { "max": 10 } ],
    //
    "max-lines": ["error",150],
    "max-len": ["error", 120, 4],
    "max-params": [2, 5],
    "max-nested-callbacks": ["error", 2]

};