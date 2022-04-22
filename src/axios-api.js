import axios from 'axios';

const instance = axios.create({
    baseURL:'http://161.49.221.231:8088/qpdis/api/v1/',
});

export default instance;