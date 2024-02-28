package com.iv1201.clientservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.HttpServletRequest;

@Slf4j
@Controller
public class ServerController {
    @GetMapping("")
    public String acceptConnection(HttpServletRequest request) {
        log.info("Application requested by {}", request.getRemoteAddr());
        return "index.html";
    }

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }
}
