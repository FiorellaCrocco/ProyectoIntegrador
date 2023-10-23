package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.entity.Rol;
import com.proyecto.onlybooks.entity.Subscription;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String lastname;
    private String name;
    private Integer dni;
    private String email;
    private String password;
    private Rol rol;
    private List<BookRent> bookRents;
    private Subscription subscription;

}
