module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parser: require.resolve('vue-eslint-parser'),
    plugins: ['vue'],
    extends: ['plugin:vue/recommended'],
    rules: {
        // vue 属性值用驼峰写法，几个html原声属性除外
        'vue/attribute-hyphenation': [
            'error',
            'never',
            {
                ignore: ['data-', 'aria-', 'slot-scope'],
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        // 'vue/max-attributes-per-line': [
        //     'error',
        //     {
        //         singleline: 3,
        //         multiline: {
        //             max: 1,
        //             allowFirstLine: false,
        //         },
        //     },
        // ],
        'vue/max-attributes-per-line': 'off', // ToFix
        'vue/no-multi-spaces': [
            'error',
            {
                ignoreProperties: true,
            },
        ],
        'vue/require-default-prop': 'off',
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'GLOBAL',
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'UNIQUE',
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'CONTENT',
                    'EVENTS',
                ],
            },
        ],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional', ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model', ['props', 'propsData'],
                    'fetch',
                    'asyncData',
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    'head', ['template', 'render'],
                    'renderError',
                ],
            },
        ],
        'vue/this-in-template': ['error', 'never'],
        'vue/array-bracket-spacing': 'error',
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/eqeqeq': 'error',
        'vue/key-spacing': [
            'error',
            {
                beforeColon: false,
                afterColon: true,
            },
        ],
        'vue/require-component-is': 'off',
        'vue/object-curly-spacing': 'off',
        'vue/require-direct-export': 'off',
        'vue/space-infix-ops': 'error',
        'vue/v-on-function-call': ['error', 'never'],
        'space-before-function-paren': 'off',
        'vue/singleline-html-element-content-newline': 'off',// fix
        'vue/no-v-html': 'off',// fix
        'vue/multiline-html-element-content-newline': 'off',// fix
        'vue/html-indent': 'off',
        'vue/no-template-shadow': 2,
        "vue/html-closing-bracket-newline": 1,
         /* 强制html标签结束 */
        'vue/html-end-tags': 'off',
           // 类的成员之间有一行空行
        'lines-between-class-members': ['error', 'always'],
    },
};