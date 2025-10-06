export const calculatePaginationData = ( {count, perPage, page} ) => {
    const totalPages = Math.ceil(count / perPage);
    return {
        totalItems: count,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
};