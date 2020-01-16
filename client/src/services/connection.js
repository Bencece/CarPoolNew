/* eslint-disable */
import axios from "../../node_modules/axios";

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000'
    })
}