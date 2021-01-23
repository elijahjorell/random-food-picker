import axios, {AxiosResponse} from "axios";
import {FindPlaceFromTextResponse, NearbySearchResponse, TextSearchResponse} from "../../react-app-env";

// ("findplacefromtext" | "nearbysearch" | "textsearch")

const googleMapsApi = {
    "findplacefromtext": async (url: string, params: object): Promise<FindPlaceFromTextResponse> => {
        const data = {
            url: url + "findplacefromtext/json?",
            params: params
        }
        return axios.post("http://localhost:8080/processGetRequest", data).then((res: AxiosResponse<FindPlaceFromTextResponse>) => {
            return res.data
        })
    },
    "nearbysearch": async (url: string, params: object): Promise<NearbySearchResponse> => {
        const data = {
            url: url + "nearbysearch/json?",
            params: params
        }
        return axios.post("http://localhost:8080/processGetRequest", data).then((res: AxiosResponse<NearbySearchResponse>) => {
            return res.data
        })
    },
    "textsearch": async (url: string, params: object): Promise<TextSearchResponse> => {
        const data = {
            url: url + "textsearch/json?",
            params: params
        }
        return axios.post("http://localhost:8080/processGetRequest", data).then((res: AxiosResponse<TextSearchResponse>) => {
            return res.data
        })
    }
}

export default googleMapsApi