import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:
    {
        api_key: "344edcbeb74c146d641f154a60722b13",
        language: "pt-BR",
        include_adult: false
    }
})