import axios from "axios";

export const urlServer = process.env.AXIOS_SERVER_URL

export const axiosCustom = axios.create({
    url: 'http://localhost:3000'
})