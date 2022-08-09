package ari.paran.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "store_name", referencedColumnName = "store_name")
    private Store name;

    @ElementCollection
    @CollectionTable(
            name = "event_info",
            joinColumns = @JoinColumn(name = "event_id")
    )
    @OrderColumn
    @Column(name = "info")
    private List<String> eventInfo;

    @Column(name = "start_date")
    private LocalDate start;

    @Column(name = "finish_date")
    private LocalDate finish;
}
