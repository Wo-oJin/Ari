package ari.paran.domain.store;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ImgFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    String filename;
    String fileurl;

    public ImgFile(Store store, String filename, String fileurl){
        this.store = store;
        this.filename = filename;
        this.fileurl = fileurl;
    }

}
