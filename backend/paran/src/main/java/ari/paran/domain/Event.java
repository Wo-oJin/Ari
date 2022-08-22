package ari.paran.domain;

import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column
    private String info;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "finish_date")
    private LocalDate finishDate;

    @Builder
    private Event(Store store, String info, LocalDate startDate, LocalDate finishDate){
        this.store = store;
        this.info = info;
        this.startDate = startDate;
        this.finishDate = finishDate;
    }

    public void changeStore(Store store){
        this.store = store;
    }

}

