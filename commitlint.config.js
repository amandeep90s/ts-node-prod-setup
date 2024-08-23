module.exports = {
  extends: ['@commitlint/cli', '@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // documentation
        'style', // formatting, missing semi colons, etc; no code change
        'refactor', // refactoring production code
        'perf', // performance improvement
        'test', // adding missing tests, refactoring tests; no production code change
        'build', // build system or external dependencies
        'ci', // CI related changes
        'chore', // updating grunt tasks etc; no production code change
        'revert' // reverting changes
      ]
    ],
    'subject-case': [2, 'always', 'sentence-case'] // sentence-case is the default value
  }
};
