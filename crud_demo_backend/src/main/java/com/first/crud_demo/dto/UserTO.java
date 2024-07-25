package com.first.crud_demo.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class UserTO {
    private String id;
    private String name;
    private String email;
    private String password;
}