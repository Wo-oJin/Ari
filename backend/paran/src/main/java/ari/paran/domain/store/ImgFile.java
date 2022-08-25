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

    String originFilename;

    String fileName;
    String fileUrl;

    public ImgFile(Store store, String fileName, String fileUrl){
        this.store = store;
        this.originFilename = originFilename;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

    @Builder
    public ImgFile(Long id, String originFilename, String filename, String fileUrl) {
        this.id = id;
        this.originFilename = originFilename;
        this.fileName = filename;
        this.fileUrl = fileUrl;
    }
}
