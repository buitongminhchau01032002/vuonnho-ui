import QueryString from 'qs';

export const routerQueryToQs = (query) => {
    return QueryString.parse(QueryString.stringify(query));
};

export const qsToRouterQuery = (qs) => {
    const str = QueryString.stringify(qs);
    // ....
};
