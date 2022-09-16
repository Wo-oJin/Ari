package ari.paran.domain.store;

import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class StoreImgFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    String filename;
    String originalFileName;
    String fileUrl;

    @Builder
    public StoreImgFile(Store store, String filename, String originalFileName, String fileUrl){
        this.store = store;
        this.filename = filename;
        this.originalFileName = originalFileName;
        this.fileUrl = fileUrl;
    }

}
