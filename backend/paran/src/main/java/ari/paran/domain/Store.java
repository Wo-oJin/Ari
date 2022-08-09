package ari.paran.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @Column(name = "store_name")
    private String name;

    @Column
    private String owner_name;

    @Column
    private String address;

    @Column(name = "phone")
    private String phoneNumber;

    @OneToMany(mappedBy = "name")
    private List<Event> eventList = new ArrayList<>();

    @Column
    private boolean private_event;

    @Column
    private boolean stamp;

}
