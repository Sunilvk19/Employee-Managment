package com.example.employee.utility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorStructure<T> {
    private int status;
    private String message;
    private T rootCause;
}
