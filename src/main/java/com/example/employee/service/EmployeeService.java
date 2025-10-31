package com.example.employee.service;


import com.example.employee.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee addEmployee(Employee employee);

    Employee findEmployeeId(Integer employeeId);

    List<Employee> findAllEmployee();

    Employee updateEmployee(Employee employee, Integer employeeId);

    Employee deleteEmployee(Integer employeeId);
}
