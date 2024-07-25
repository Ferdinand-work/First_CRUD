package com.first.crud_demo.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(value = "user")
@Data
@Builder
public class User {
    @Id
    private String id;
    @Field(name = "user_name")
    private String name;
    private String email;
    private String password;
}
