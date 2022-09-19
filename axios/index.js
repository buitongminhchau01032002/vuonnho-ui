import axios from 'axios';
import QueryString from 'qs';

const client = axios.create({
    baseURL: 'http://localhost:1337/api',
    paramsSerializer: (p) => {
        return QueryString.stringify(p, { encodeValuesOnly: false });
    },
    validateStatus: function (status) {
        return true;
    },
});

export default client;
