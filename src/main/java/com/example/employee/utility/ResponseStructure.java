package com.example.employee.utility;

import lombok.*;

@Data
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseStructure<T>{
    private int status;
    private String message;
    private T data;
}
