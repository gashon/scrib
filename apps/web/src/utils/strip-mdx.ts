export const stripMarkdown = (content: string) => {
  return content.replace(/#|`|\n /g, '');
};
