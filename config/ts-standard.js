module.exports = {
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        parser: require.resolve('@typescript-eslint/parser'),
    },
    rules: {
        // type 和 interface 都支持
        '@typescript-eslint/consistent-type-definitions': 'off',
        // 不强制函数返回类型有声明
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',  //ToFix
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/member-naming': 'off',
        // 暂时不强制定义类型，any暂不处理
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        // 暂时关掉，以后去规范
        '@typescript-eslint/no-namespace': 'off',
        // 非空断言 不禁止
        '@typescript-eslint/no-non-null-assertion': 'off',
        // class constructor 参数属性类型不禁止
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true, // Allow `const { props, state } = this`; false by default
                allowedNames: ['self', 'vm', '_this', 'that'], // Allow `const self = this`; `[]` by default
            },
        ],
        '@typescript-eslint/no-type-alias': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        'require-await': 'off',
        '@typescript-eslint/require-await': 'off',
        semi: 'off',
        '@typescript-eslint/semi': 'off',
        // 过于严格，后续观察
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/triple-slash-reference': [
            'error',
            { path: 'never', types: 'never', lib: 'never' },
        ],
        '@typescript-eslint/unbound-method': 'off',
        'no-shadow': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: true, ignoreDeclarationMerge: true }],
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
            enums: false,
        }],
        'comma-dangle': 'off', // to fix
        'camelcase': 'off', // to fix
        'indent': 'off', // to fix
        'quotes': 'off', // to fix
        'one-var': 'off', // to fix
           // 类的成员之间有一行空行
        'lines-between-class-members': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': 'off', // to fix
        '@typescript-eslint/array-type': 'off', // to fix
        'promise/param-names': 'off', // to fix
        '@typescript-eslint/no-shadow': 'off', // to fix
        'vue/singleline-html-element-content-newline': 'off', // to fix
        /* airbnb */
        'no-var': 'off', // fix
        'vars-on-top': 'off', // fix
        'no-inner-declarations': 'off',
        'no-self-assign': 'off',
        'no-undef': 'off',
        'getter-return': 'off',
        'no-inner-declaration': 'off',
        'no-lone-blocks': 'off', // fix
        'no-return-await': 'off',
        'no-new': 'off',
        'no-await-in-loop': 'off',
        'no-array-constructor': 'off',
        'import/export': 'off',
        'no-empty-function': 'off', // fix
        'computed-property-spacing': 'off',
        'no-empty-pattern': 'off',
        'space-unary-ops': 'off',
        'radix': 'off',
        'prefer-arrow-callback': 'off',
        'no-cond-assign': 'off',
        'one-var-declaration-per-line': 'off',
        'no-irregular-whitespace': 'off', // fix
        'guard-for-in': 'off', // fix
        'no-useless-concat': 'off', // fix
        'no-new-func': 'off', // fix
        'no-bitwise': 'off', // fix
        'no-extra-semi': 'off', // fix
        'no-loop-func': 'off', // fix
        'no-constant-condition': 'off', // fix
        'no-eval': 'off', // fix
        'curly': 'off', // fix
        'yoda': 'off', // fix
        'no-useless-constructor': 'off', // fix
        'no-case-declarations': 'off', // fix
        'no-extra-sem': 'off', // fix
        'no-unreachable': 'off',
        'array-bracket-spacing': 'off',
        'no-confusing-arrow': 'off',
        'no-labels': 'off',
        'no-useless-return': 'off',
        'object-curly-spacing': 'off',
        'operator-assignment': 'off',
        'no-extra-boolean-cast': 'off', // fix
        'no-duplicate-case': 'off', // fix
        'no-continue': 'off', // fix
        'quote-props': 'off', // fix
        'no-debugger': 'off', // fix
        'strict': 'off',
        'semi-spacing': 'off',
        'no-lonely-if': 'off',
        'no-else-return': 'off',
        'no-nested-ternary': 'off',
        'import/newline-after-import': 'off',
        'no-multiple-empty-lines': 'off',
        'block-scoped-var': 'off', // fix
        'prefer-const': 'off', // fix
        'no-undef-init': 'off',
        'dot-notation': 'off',
        'template-curly-spacing': 'off',
        'no-empty': 'off',
        'default-case': 'off',
        'no-multi-assign': 'off',
        'function-paren-newline': 'off',
        'object-curly-newline': 'off',
        'no-multi-spaces': 'off',
        'space-in-parens': 'off',
        'comma-spacing': 'off',
        'spaced-comment': 'off',
        'block-spacing': 'off',
        'space-infix-ops': 'off',
        'eol-last': 'off',
        'key-spacing': 'off',
        'no-trailing-spaces': 'off',
        'space-before-function-paren': 'off',
        'func-names': 'off',
        'object-shorthand': 'off',
        'arrow-spacing': 'off',
        'keyword-spacing': 'off',
        'arrow-body-style': 'off',
        'no-unneeded-ternary': 'off',
        'arrow-parens': 'off',
        'space-before-blocks': 'off',
        'prefer-template': 'off',
        'padded-blocks': 'off',
        'prefer-destructuring': 'off',
        'space-before-block': 'off',
        'global-require': 'off',
        'import/no-mutable-exports': 'off',
        'no-plusplus': 'off',
        'import/prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'no-fallthrough': 'off',
        'array-callback-return': 'off',
        'brace-style': 'off',
        'import/no-duplicates': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-unused-expressions': 'off',
        'import/no-named-as-default': 'off',
        'no-prototype-builtins': 'off',
        'import/first': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        /* airbnb */
        'no-useless-escape': 'off',
        'import/no-named-as-default-member': 'off',
        'no-return-assign': 'off',
        'no-console': 'off',
        // 'no-': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
        /* 允许阴影变量state */
        'no-tabs': 0,
        'no-underscore-dangle': 0,
        'no-mixed-operators': 0,
        'no-param-reassign': 0,
        'no-new-object': 0,
        'consistent-return': 0,
        'max-len': 0,
        // 'no-plusplus': 0,
        'no-restricted-globals': 0,
        'class-methods-use-this': 0,
        'import/no-extraneous-dependencies': 0,
        /* NOTE: 以下规则依赖于eslint-plugin-vue，eslint-plugin-html */
        'vue/attribute-hyphenation': 0,
        // /* html标签关闭前强制换行：单行不执行，多行执行 */
        // 'vue/html-closing-bracket-newline': 'off',
        // /* html标签关闭前后不允许空格： < i />不被允许 */
        // 'vue/html-closing-bracket-spacing': 'off',
        /* 禁止定义无用参数：过于严格，可以不使用 */
        'vue/no-unused-vars': 'off',
        /* template内部缩进2个空格，属性间隔开1个空格，自动对其属性缩进 */
        'vue/html-indent': 'off',
        // <div>{{text}}</div>
        'vue/mustache-interpolation-spacing': 'off',
        /* 禁止重复空格 */
        'vue/no-multi-spaces': 'off',
        'vue/v-bind-style': 1,
        'vue/v-on-style': 1,
        /* 每行最多2个属性，超出则单个属性一行进行分行对齐 */
        'vue/max-attributes-per-line': 'off',
        /* 计算属性中禁止包含异步方法 */
        'vue/no-async-in-computed-properties': 2,
        /* 禁止在对象字面量中出现重复的键 */
        'vue/no-dupe-keys': 2,
        /* 禁止出现语法错误 */
        'vue/no-parsing-error': [2, {
            'x-invalid-end-tag': false,
        }],
        /* 禁止覆盖保留字 */
        'vue/no-reserved-keys': 2,
        /* 禁止在textarea出现{{value}} */
        'vue/no-textarea-mustache': 2,
        'vue/require-component-is': 2,
        /* render函数必须有返回值 */
        'vue/require-render-return': 2,
        /* v-for必须定义key */
        'vue/require-v-for-key': 2,
        /* 校验template的根节点：必须唯一且合法 */
        'vue/valid-template-root': 2,
        'vue/valid-v-bind': 2,
        'vue/valid-v-cloak': 2,
        'vue/valid-v-else-if': 2,
        'vue/valid-v-else': 2,
        'vue/valid-v-for': 2,
        'vue/valid-v-html': 2,
        'vue/valid-v-if': 2,
        'vue/valid-v-model': 2,
        'vue/valid-v-on': 2,
        'vue/valid-v-once': 2,
        'vue/valid-v-pre': 2,
        'vue/valid-v-show': 2,
        'vue/valid-v-text': 2,
        /* 关闭v-if必须是计算属性 */
        'vue/no-use-v-if-with-v-for': 0,
        /* html属性值必须用双括号括起来 */
        'vue/html-quotes': 2,
        'object-property-newline': 0,
        'no-unexpected-multiline': 'off', // ToFix
    },
};