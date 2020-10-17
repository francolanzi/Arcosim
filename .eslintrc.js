const env = {
  'browser': true,
  'es2020': true,
  'node': true,
};

const ext = ['prettier', 'eslint:recommended'];

const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
};

const rules = {
  // Posible Errors
  'no-unreachable-loop': 'error',

  // Best Practices
  'curly': ['error', 'all'],
  'default-case': 'error',
  'default-case-last': 'error',
  'eqeqeq': ['error', 'always'],
  'no-constructor-return': 'error',
  'no-self-compare': 'error',
  'no-useless-return': 'error',

  //Variables
  'init-declarations': ['error', 'always'],
  'no-use-before-define': [
    'error',
    {
      'functions': true,
      'classes': true,
      'variables': true,
    },
  ],

  //Stylistic Issues
  'array-bracket-spacing': ['error', 'never'],
  'brace-style': [
    'error',
    '1tbs',
    {
      'allowSingleLine': false,
    },
  ],
  'camelcase': 'error',
  'comma-dangle': ['error', 'always-multiline'],
  'comma-spacing': [
    'error',
    {
      'before': false,
      'after': true,
    },
  ],
  'comma-style': ['error', 'last'],
  'computed-property-spacing': ['error', 'never'],
  'eol-last': ['error', 'always'],
  'func-call-spacing': ['error', 'never'],
  'indent': ['error', 2],
  'linebreak-style': ['error', 'windows'],
  'lines-between-class-members': [
    'error',
    'always',
    { 'exceptAfterSingleLine': true },
  ],
  'new-cap': [
    'error',
    {
      'newIsCap': true,
      'capIsNew': true,
      'properties': true,
    },
  ],
  'new-parens': ['error', 'always'],
  'no-lonely-if': 'error',
  'no-multiple-empty-lines': [
    'error',
    {
      'max': 1,
      'maxEOF': 0,
      'maxBOF': 0,
    },
  ],
  'no-tabs': [
    'error',
    {
      'allowIndentationTabs': false,
    },
  ],
  'no-trailing-spaces': [
    'error',
    {
      'skipBlankLines': false,
      'ignoreComments': false,
    },
  ],
  'no-whitespace-before-property': 'error',
  'nonblock-statement-body-position': ['error', 'below'],
  'object-curly-spacing': ['error', 'always'],
  'quotes': [
    'error',
    'single',
    {
      'allowTemplateLiterals': true,
    },
  ],
  'semi': ['error', 'always'],
  'semi-spacing': [
    'error',
    {
      'before': false,
      'after': true,
    },
  ],
  'semi-style': ['error', 'last'],
  'space-before-blocks': ['error', 'always'],
  'space-in-parens': ['error', 'never'],

  // ECMAScript 6
  'arrow-body-style': [
    'error',
    'as-needed',
    {
      'requireReturnForObjectLiteral': true,
    },
  ],
  'arrow-parens': [
    'error',
    'as-needed',
    {
      'requireForBlockBody': false,
    },
  ],
  'arrow-spacing': [
    'error',
    {
      'before': true,
      'after': true,
    },
  ],
  'no-useless-constructor': 'error',
  'no-var': 'error',
  'object-shorthand': ['error', 'always'],
  'prefer-arrow-callback': [
    'error',
    {
      'allowNamedFunctions': false,
      'allowUnboundThis': true,
    },
  ],
  'prefer-const': [
    'error',
    {
      'destructuring': 'all',
      'ignoreReadBeforeAssign': false,
    },
  ],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'rest-spread-spacing': ['error', 'never'],

  // https://eslint.org/docs/rules/
};

module.exports = {
  overrides: [
    {
      files: ['*.ts'],
      env,
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', ...ext],
      parserOptions,
      rules,
    },
    {
      files: ['*.js'],
      env,
      extends: [...ext],
      parserOptions,
      rules,
    },
  ],
};
