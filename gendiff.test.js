const { genDiff } = require('./gendiff');
const filepath1 = require('./__fixtures__/filepath1.json');
const filepath2 = require('./__fixtures__/filepath2.json');

describe('genDiff', () => {
  it('returns correct diff', () => {
    const expectedDiff = `- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true`;
    expect(genDiff(filepath1, filepath2)).toBe(expectedDiff);
  });
});

