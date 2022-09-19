import axios from 'axios';
import QueryString from 'qs';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    paramsSerializer: (p) => {
        return QueryString.stringify(p, { encodeValuesOnly: false });
    },
    validateStatus: function (status) {
        return true;
    },
});

export default client;
