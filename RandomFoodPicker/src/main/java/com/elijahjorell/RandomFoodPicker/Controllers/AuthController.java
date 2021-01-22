package com.elijahjorell.RandomFoodPicker.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AuthController implements ApplicationRunner {

    @Value("${key}")
    private String key;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(key);
    }

}
