export const parseNumber = (number, defaultValue) => {
  const parsedNumber = parseInt(number, 10);
  return isNaN(parsedNumber) ? defaultValue : parsedNumber;
};

export const parsePaginationParams = (pagination) => {
  const { page, perPage } = pagination || {};

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 9);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
