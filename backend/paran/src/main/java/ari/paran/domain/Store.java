package ari.paran.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

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
    private String ownerName;

    @Column
    private String roadAddress;

    @Column
    private String detailAddress;

    @Column(name = "phone")
    private String phoneNumber;

    @ColumnDefault("0")
    @Column
    private boolean privateEvent;

    @ColumnDefault("0")
    @Column
    private boolean stamp;

    @Builder
    public Store(String name, String ownerName, String roadAddress, String detailAddress, String phoneNumber) {
        this.name = name;
        this.ownerName = ownerName;
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
        this.phoneNumber = phoneNumber;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "store")
    private List<Partnership> partnershipList;

    @JsonManagedReference
    @OneToMany(mappedBy = "name")
    private List<Event> eventList;

    public boolean getPrivateEvent(){
        return this.privateEvent;
    }

    public boolean getStamp(){
        return this.stamp;
    }


}
