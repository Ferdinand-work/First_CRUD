package com.first.crud_demo.service;

import com.first.crud_demo.dto.EmployeeTO;
import com.first.crud_demo.model.Employee;
import com.first.crud_demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public String createEmployee(EmployeeTO employeeTO)
    {
        try {
            Employee emp = Employee.builder()
                    .empName(employeeTO.getEmpName())
                    .salary(employeeTO.getSalary())
                    .location(employeeTO.getLocation())
                    .build();
            employeeRepository.save(emp);
        }catch (Exception e)
        {
            // Handle exception
        }
        return "Employee created successfully";
    }

    public List<Employee> getEmployee()
    {
        List<Employee> empList = new ArrayList<>();
        try{
            empList = employeeRepository.findAll();
        } catch (Exception e){
            //
        }
        return empList;
    }

    public String deleteEmployee(String id) {
        try {
            employeeRepository.deleteById(id);
        } catch(Exception e) {
            //
        }
        return "Employee deleted successfully";
    }

    public String updateEmployee(EmployeeTO emp) {
        try {
            Employee employee = Employee.builder()
                    .id(emp.getId())
                    .empName(emp.getEmpName())
                    .location(emp.getLocation())
                    .salary(emp.getSalary())
                    .build();
            employeeRepository.save(employee);
        } catch(Exception e) {
            //
        }
        return "Employee updated successfully";
    }

    public Employee getOneEmployee(String id) {
        Employee emp = null;
        try{
            emp = employeeRepository.findById(id).orElse(null);
        } catch (Exception e){
            //
        }
        return emp;
    }
}
