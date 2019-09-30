import axios from 'axios';

const callTodosApi = async () => {
    let res, err;
    await axios.get('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10')
    .then((response) => {
        res = response;
    })
    .catch((error) => {
        err = { error: error.message || 'Unknown error' };
    });

    return { res, err };
};

export default callTodosApi;