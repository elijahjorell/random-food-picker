package com.elijahjorell.RandomFoodPicker.Controllers;

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
public class ZomatoController {

    private final static Log LOGGER = LogFactory.getLog(ZomatoController.class);
    private final static String baseUrl = "https://developers.zomato.com/api/v2.1/";

    @Value("${key}")
    private String key;

    @PostMapping("/get/{resource}")
    @ResponseBody
    public Object getKey(@PathVariable String resource, @RequestBody Map<String, String> params) {
        LOGGER.info("Processing query to '" + resource + "' resource with attributes: " + params);
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("user-key", key);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(baseUrl + resource);
        params.entrySet().forEach((entry) -> {
            uriBuilder.queryParam(entry.getKey(), entry.getValue());
        });

        try {
            LOGGER.info("Attempting to query Zomato");
            ResponseEntity<?> result = restTemplate.exchange(
                    uriBuilder.build().toUri(),
                    HttpMethod.GET,
                    entity,
                    Map.class
            );
            LOGGER.info("Query successful");
            return result.getBody();
        } catch(Exception e) {
            LOGGER.error(e);
        }

        return null;
    }



}
