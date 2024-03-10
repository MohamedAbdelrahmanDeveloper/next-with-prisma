import axios from "axios";


export const axiosCustom = axios.create({
    url: 'http://localhost:3000'
})