const { flow, get, split, last } = require('lodash/fp');

export const getToken = (headers) => flow(
  get('authorization'),
  split(' '),
  last,
)(headers);
