package com.iv1201.clientservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ServerController {
    @GetMapping("")
    public String acceptConnection() {
        return "index.html";
    }

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }
}
