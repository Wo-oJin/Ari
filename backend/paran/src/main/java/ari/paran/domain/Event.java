package ari.paran.domain;

import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column
    private String info;

    @Column(name = "start_date")
    private LocalDate start;

    @Column(name = "finish_date")
    private LocalDate finish;

    protected Event(){};
}
