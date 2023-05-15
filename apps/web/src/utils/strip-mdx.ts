export const stripMarkdown = (content: string) => {
  return content.replace(/#|`/g, '');
};
