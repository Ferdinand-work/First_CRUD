package com.first.crud_demo.controller;

import com.first.crud_demo.dto.EmployeeTO;
import com.first.crud_demo.model.Employee;
import com.first.crud_demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emp")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public String createEmployee(@RequestBody EmployeeTO emp)
    {
        return employeeService.createEmployee(emp);
    }

    @GetMapping("/get/employee")
    @ResponseStatus(HttpStatus.OK)
    public List<Employee> getEmployee()
    {
        return employeeService.getEmployee();
    }

    @GetMapping("/get/one_employee")
    @ResponseStatus(HttpStatus.OK)
    public Employee getOneEmployee(@RequestParam String id)
    {
        return employeeService.getOneEmployee(id);
    }

    @DeleteMapping("/delete/employee")
    @ResponseStatus(HttpStatus.OK)
    public String deleteEmployee(@RequestParam String id)
    {
        return employeeService.deleteEmployee(id);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public String updateEmployee(@RequestBody EmployeeTO emp)
    {
        return employeeService.updateEmployee(emp);
    }
}
