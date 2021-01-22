package com.elijahjorell.RandomFoodPicker.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Controller
public class ZomatoController {

    @Value("${key}")
    private String key;

    @GetMapping("/key")
    @ResponseBody
    public ResponseEntity<Map> getKey() {

        // TODO: Automate uri + params from frontend

        String uri = "https://developers.zomato.com/api/v2.1/categories";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("user-key", key);

        HttpEntity<String> fields = new HttpEntity<>(headers);

        try {
            System.out.println(key);
            ResponseEntity<Map> result = restTemplate.exchange(
                    uri,
                    HttpMethod.GET,
                    fields,
                    Map.class
            );
            System.out.println(result);
            return result;
        } catch(Exception e) {
            System.out.println(e);
        }

        return null;
    }



}
