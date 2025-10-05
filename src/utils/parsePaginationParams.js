const parseInteger = (value, defaultValue) => {
    if (typeof value !== "string") return defaultValue;
    const parsedValue = parseInt(value);
    if (Number.isNaN(parseInt(parsedValue))) return defaultValue;
    return parsedValue;
    };
    

export const parsePaginationParams = ({ perPage, page }) => {
    const parsePerPage = parseInteger(perPage, 10);
    const parsePage = parseInteger(page, 1);
    return {
        perPage: parsePerPage,
        page: parsePage
    };
};