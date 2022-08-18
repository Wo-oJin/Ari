package ari.paran.domain;

import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Getter
@Entity
public class SignupCode {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotNull
    String code;
//    @ColumnDefault("0")
//    boolean activated;

//    public void setActivatedTrue() {
//        this.activated = true;
//    }
}

