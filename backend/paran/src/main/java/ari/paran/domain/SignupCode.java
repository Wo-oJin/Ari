package ari.paran.domain;

import ari.paran.domain.store.Store;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Entity
public class SignupCode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String code;
    @ColumnDefault("0")
    private boolean activated;

    @OneToOne
    @JoinColumn(name = "store_id")
    private Store store;

    public void setActivatedTrue() {

        this.activated = true;
    }

    public void setStore(Store store) {
        this.store = store;
    }
}

