const parseNumber = (number, defaultValue) => {
    const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};
    // if (typeof value !== "string") return defaultValue;
    // const parsedValue = parseInt(value);
    // if (Number.isNaN(parseInt(parsedValue))) return defaultValue;
    // return parsedValue;
   
    

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};