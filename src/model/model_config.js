// eslint-disable-next-line import/prefer-default-export
export const keys = {
  0: { type: 'number' },
  1: { type: 'number' },
  2: { type: 'number' },
  3: { type: 'number' },
  4: { type: 'number' },
  5: { type: 'number' },
  6: { type: 'number' },
  '.': { type: 'number' },
  7: { type: 'number' },
  8: { type: 'number' },
  9: { type: 'number' },

  '=': { type: 'operator' },
  '+': { type: 'operator', binary: true, priority: 1 },
  '-': { type: 'operator', binary: true, priority: 1 },
  '*': { type: 'operator', binary: true, priority: 2 },
  c: { type: 'operator' },
  '+-': { type: 'operator' },
  '/': { type: 'operator', binary: true, priority: 2 },
  '%': { type: 'operator', binary: true, priority: 2 },
  '(': {
    type: 'operator', priority: 0, binary: true, prefix: true,
  },
  ')': {
    type: 'operator', priority: 0, binary: true, prefix: false,
  },
  mc: { type: 'operator' },
  'm+': { type: 'operator' },
  'm-': { type: 'operator' },
  mr: { type: 'operator' },
  '2^': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: true,
  },
  '^2': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: false,
  },
  '^3': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: false,
  },
  '^': { type: 'operator', binary: true, priority: 3 },
  'e^': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: true,
  },
  '10^': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: true,
  },
  '1/': {
    type: 'operator', binary: false, priority: 3, convertible: true, prefix: true,
  },
  '√': {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  '∛': {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  root: { type: 'operator', binary: true, priority: 3 },
  ln: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  log: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  '!': { type: 'operator', binary: false, priority: 3 },
  sin: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  cos: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  tan: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  e: { type: 'operator', convertible: true },
  EE: { type: 'operator' },
  rad: { type: 'operator', binary: false },
  sinh: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  cosh: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  tanh: {
    type: 'operator', binary: false, priority: 3, prefix: true,
  },
  π: { type: 'operator', convertible: true },
  rand: { type: 'operator', binary: false, prefix: true },
};
