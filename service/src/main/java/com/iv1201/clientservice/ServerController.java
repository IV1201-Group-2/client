package com.iv1201.clientservice;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ServerController {
    @GetMapping("")
    public String acceptConnection() {
        return "index.html";
    }

    class Token {
        private String value;

        public Token(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    class Role {
        private String value;

        public Role(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    @GetMapping("/getToken")
    @ResponseBody
    public Token getToken() {
        return new Token("test");
    }

    @PostMapping("/getRole")
    @ResponseBody
    public Role getRole(@RequestHeader("Authorization") String authorizationHeader) {
        return authorizationHeader.substring("Bearer".length() + 1, authorizationHeader.length()).equals("test") ? new Role("Applicant") : new Role("Recruiter");
    }
}