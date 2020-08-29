// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true // NOTE: ADD
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: false, // NOTE: modify. 7.12  가급적 mutate parameter는 사용하지 않는다. 하지만, 필요에 의해서는 주의하여 사용한다. (Naver)
      // ignorePropertyModificationsFor: [
      //   'state', // for vuex state
      //   'acc', // for reduce accumulators
      //   'e' // for e.returnvalue
      // ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // NOTE: 추가 규칙
    // https://github.com/airbnb/javascript
    'linebreak-style': 0, // LF가 아닌 CRLF 기준으로 줄바꿈 체크, https://eslint.org/docs/rules/linebreak-style#options
    'max-len': ["error", { "code": 300 }], //19.12 customizing
     "arrow-parens": ["error", "always"], // prettier에서 파라미터가 하나만 있는 경우  ()를 삭제하기 때문에 airbnb의 기본 룰을 명시해서 해당 룰에 맞게 formatter가 동작하도록 함.
     'no-unused-vars': 'error'
  }
}
