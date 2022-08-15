export const readingDocTime = (text) => {
  const str = removeHtmlTags(text);
  const wordCount = str.match(/(\w+)/g).length;
  const count_time = Math.floor(wordCount / 200);

  return count_time;
};

export const removeHtmlTags = (html: string) => {
  const htmlData = html.toString();
  const strippedString = htmlData.replace(/(<([^>]+)>)/gi, '');
  return strippedString;
};
