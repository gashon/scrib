export const cursorToInt = (cursor: string | undefined) => {
  if (!cursor) {
    return 0;
  }
  return parseInt(Buffer.from(cursor, 'base64').toString('ascii').slice(6), 10);
};
