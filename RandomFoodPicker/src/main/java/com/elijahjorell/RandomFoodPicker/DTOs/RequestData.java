package com.elijahjorell.RandomFoodPicker.DTOs;

import java.util.Map;

public class RequestData {

    private String url;
    private Map<String, Object> params;

    public RequestData(String url, Map<String, Object> params) {
        this.url = url;
        this.params = params;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }

    @Override
    public String toString() {
        return "ApiRequest{" +
                "url='" + url + '\'' +
                ", params=" + params +
                '}';
    }

}
