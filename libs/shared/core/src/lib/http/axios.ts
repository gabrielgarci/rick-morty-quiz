//Axios libray
import axios from 'axios';
import { responseMapper } from './response/response';

const instance = axios.create();

instance.interceptors.response.use(responseMapper);

export const http = instance;
