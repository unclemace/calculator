// eslint-disable-next-line import/prefer-default-export
export function sortKeys(keys) {
  return Object.keys(keys).sort((a, b) => {
    if (keys[a].rowId === keys[b].rowId) {
      return keys[a].position - keys[b].position;
    }
    return keys[b].rowId - keys[a].rowId;
  });
}
