package com.elijahjorell.RandomFoodPicker.Controllers;

import com.elijahjorell.RandomFoodPicker.DTOs.RequestData;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Controller
@CrossOrigin("*")
public class RequestController {

    private final static Log LOGGER = LogFactory.getLog(RequestController.class);

    @Value("${key}")
    private String key;

    @PostMapping("/processGetRequest")
    @ResponseBody
    public Object processGetRequest(@RequestBody RequestData requestData) {
        LOGGER.info("Processing request to: " + requestData.getUrl() + " with parameters: " + requestData.getParams());
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> entity = new HttpEntity<>(new HttpHeaders());

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(requestData.getUrl());
        requestData.getParams().forEach(uriBuilder::queryParam);
        uriBuilder.queryParam("key", key);

        try {
            LOGGER.info("Attempting to send request: " + uriBuilder.build().toUri());
            ResponseEntity<?> result = restTemplate.exchange(uriBuilder.build().toUri(), HttpMethod.GET, entity, Map.class);
            LOGGER.info("Request successful");
            return result.getBody();
        } catch(Exception e) {
            LOGGER.error(e);
        }

        return null;
    }



}
