package com.proyecto.onlybooks.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="subscriptions")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    private Double discount; // CAMBIE DE INTEGER A DOUBLE, EJ. 18,3% DEL IVA

    @NotNull
    @NotBlank
    private Integer cantBooks;

    @NotNull
    @NotBlank
    @Enumerated(EnumType.STRING)
    private SubsType subsType;

    @NotNull
    @NotBlank
    private Date startSubs;

    @NotNull
    @NotBlank
    private Date endSubs;

    // Una subscription un usuario.
    @NotNull
    @NotBlank
    @OneToOne(mappedBy = "subscription")
    private User user;

}
