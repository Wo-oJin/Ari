package ari.paran.domain;

import javax.persistence.*;
import java.util.*;

@Entity
public class Partnership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long partnership_id;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store storeId;

    @ManyToOne
    @JoinColumn(name = "from_store_name", referencedColumnName = "store_name")
    private Store storeName;

    @Column(name = "to_store_name")
    private String partnerName;

    @ElementCollection
    @CollectionTable(
            name = "partnership_info",
            joinColumns = @JoinColumn(name = "partnership_id")
    )
    private List<String> info;
}
