package com.first.crud_demo.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Document(value = "employee")
@Data
@Builder
public class Employee {
    @Id
    private String id;
    @Field(name = "employee_name")
    private String empName;
    private String location;
    private BigDecimal salary;
}
