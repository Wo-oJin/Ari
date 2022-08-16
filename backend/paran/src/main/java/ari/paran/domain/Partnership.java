package ari.paran.domain;

import ari.paran.domain.store.Store;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partnership_id;

    @JsonBackReference
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "store_id", referencedColumnName = "store_id"),
            @JoinColumn(name = "from_store_name", referencedColumnName = "store_name")
    })
    private Store store;

    @Column(name = "to_store_name")
    private String partnerName;

    private transient String partnerLocation;

    @ElementCollection
    @CollectionTable(
            name = "partnership_info",
            joinColumns = @JoinColumn(name = "partnership_id")
    )
    private List<String> info;
}
