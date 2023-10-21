package com.proyecto.onlybooks.dto;

import com.proyecto.onlybooks.entity.SubsType;
import com.proyecto.onlybooks.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionDTO {

    private Long id;
    private Double discount;
    private Integer cantBooks;
    private SubsType subsType;
    private Date startSubs;
    private Date endSubs;
    private User user;

}
