package ari.paran.domain.store;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Embeddable
public class ImgFile {

    String filename;
    String fileurl;

    public ImgFile(){};

    public ImgFile(String filename, String fileurl){
        this.filename = filename;
        this.fileurl = fileurl;
    }

}
