import axios from "axios";

export const urlServer = 'http://192.168.1.24:3000'

export const axiosCustom = axios.create({
    url: 'http://localhost:3000'
})