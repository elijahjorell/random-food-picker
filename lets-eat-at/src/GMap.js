import axios from "axios";

const GMap = {
    getKey: () => {
        return axios.get("https://qsy3wiiyh5.execute-api.us-east-2.amazonaws.com/beta/key").then((res) => {
            return res.data.key;
        })
    },
    sendRequestToBackend: (url, params) => {
        return GMap.getKey().then((key) => {
            params["key"] = key;
            return axios.post("https://khgwuncmu8.execute-api.us-east-2.amazonaws.com/beta/request", {url, params}).then((res) => {
                return res.data.body;
            });
        })
    },
    findPlaceFromText: (text) => {
        const url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
        const params = {
            input: text,
            inputtype: "textquery"
        };
        return GMap.sendRequestToBackend(url, params);
    },
    nearbySearch: (lat, lon, radius, type=null) => {
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        const params = {
            location: lat + "," + lon,
            radius: radius
        };
        if (type) params["type"] = type;
        return GMap.sendRequestToBackend(url, params);
    },
    textsearch: (query) => {
        const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
        const params = {
            query: query
        };
        return GMap.sendRequestToBackend(url, params);
    }
}

export default GMap;