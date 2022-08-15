import slugify from 'slugify';

const slugGenerator = (
  slugName: string,
  replacement?: string,
  lower?: boolean,
  trim?: boolean,
): string => {
  const result = slugify(slugName, {
    replacement: replacement ?? '-', // replace spaces with replacement character, defaults to `-`
    remove: /[^a-zA-Z0-9 ]/g, // remove characters that match regex, defaults to `undefined`
    lower: lower ?? true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    locale: 'vi', // language code of the locale to use
    trim: trim ?? true, // trim leading and trailing replacement chars, defaults to `true`
  });

  return result;
};

export default slugGenerator;
