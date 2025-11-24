package com.example.employee.controller;

import com.example.employee.entity.Employee;
import com.example.employee.service.EmployeeService;
import com.example.employee.utility.ResponseStructure;
import com.example.employee.utility.RestResponseBuilder;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173/")
@AllArgsConstructor
@RestController
public class EmployeeController {
    private final EmployeeService employeeService;
    private final  RestResponseBuilder responseBuilder;

    @PostMapping("/add")
    public ResponseEntity<ResponseStructure<Employee>> addEmployee(@RequestBody Employee employee){
        Employee emp = employeeService.addEmployee(employee);
        return responseBuilder.success(HttpStatus.CREATED,"Employee Added SuccessFully",emp);
    }
    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<ResponseStructure<Employee>> findByEmployeeId(@PathVariable Integer employeeId){
        Employee emp = employeeService.findEmployeeId(employeeId);
        return responseBuilder.success(HttpStatus.OK,"Employee is Found",emp);
    }
    @GetMapping("/employees")
    public ResponseEntity<ResponseStructure<List<Employee>>> findAllEmployee(){
        List<Employee> employeeList = employeeService.findAllEmployee();
        return responseBuilder.success(HttpStatus.OK,"All Employee list",employeeList);
    }
    @GetMapping("/employees{employeeId}")
    public ResponseEntity<ResponseStructure<Employee>> updateEmployee(@RequestBody @PathVariable Employee employee, Integer employeeId){
        Employee emp = employeeService.updateEmployee(employee, employeeId);
        return responseBuilder.success(HttpStatus.OK,"Employee is Updated successfully",emp);
    }
    
    @DeleteMapping("employees{employeeId}")
    public ResponseEntity<ResponseStructure<Employee>> deleteEmployee(@PathVariable Integer employeeId){
        Employee emp = employeeService.deleteEmployee(employeeId);
        return responseBuilder.success(HttpStatus.OK,"Employee details Deleted Successfully",emp);
    }
}
