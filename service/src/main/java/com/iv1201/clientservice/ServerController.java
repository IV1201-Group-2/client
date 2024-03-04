package com.iv1201.clientservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import jakarta.servlet.http.HttpServletRequest;

@Slf4j
@Controller
public class ServerController {
    @GetMapping("/{path:[^\\.]*}")
    public String acceptConnection(HttpServletRequest request) {
        log.info("{} requested by {}", request.getRequestURI(), request.getRemoteAddr());
        return "index.html";
    }
}
