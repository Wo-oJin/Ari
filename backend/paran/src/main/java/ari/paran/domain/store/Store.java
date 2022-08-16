package ari.paran.domain.store;

import ari.paran.domain.Event;
import ari.paran.domain.Partnership;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.annotations.One;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Store implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @Column(name = "store_name")
    private String name;

    @Column
    private String owner_name;

    @Embedded
    @Column
    private Address address;

    @Column(name = "phone")
    private String phoneNumber;

    @JsonManagedReference
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<ImgFile> imgFile = new ArrayList<>();

    @Column
    private boolean privateEvent;

    @Column
    private boolean stamp;

    @JsonManagedReference
    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Partnership> partnershipList;

    @JsonManagedReference
    @OneToMany(mappedBy = "name", cascade = CascadeType.ALL)
    private List<Event> eventList;

    public boolean getPrivateEvent(){
        return this.privateEvent;
    }

    public boolean getStamp(){
        return this.stamp;
    }

}
