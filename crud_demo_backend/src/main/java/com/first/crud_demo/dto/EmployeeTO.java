package com.first.crud_demo.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class EmployeeTO {
    private String id;
    private String empName;
    private String location;
    private BigDecimal salary;
}
