package com.example.employee.serviceimpl;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import com.example.employee.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee findEmployeeId(Integer employeeId) {
        Optional<Employee> optional = employeeRepository.findById(employeeId);
        if(optional.isEmpty()) {
            throw new RuntimeException("Employee is not found.");
        }
        return optional.get();
    }
    @Override
    public List<Employee> findAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Employee employee, Integer employeeId) {
        Employee existEmployee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new RuntimeException("No Such Employee is Found"));
        existEmployee.setEmployeeName(employee.getEmployeeName());
        existEmployee.setEmployeeEmail(employee.getEmployeeEmail());
        existEmployee.setEmployeePhoneNo(employee.getEmployeePhoneNo());
        existEmployee.setEmployeeDepartment(employee.getEmployeeDepartment());
          return employeeRepository.save(existEmployee);
    }

    @Override
    public Employee deleteEmployee(Integer employeeId) {
        Optional<Employee> optional = employeeRepository.findById(employeeId);
        if(optional.isEmpty()){
            throw new RuntimeException("Employee is not found");
        }
        employeeRepository.deleteById(employeeId);
        return optional.get();
    }
}
