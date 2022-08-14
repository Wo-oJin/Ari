package ari.paran.domain.store;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Embeddable
public class ImgFiles {

    String filename;
    String fileOriName;
    String fileurl;

    public ImgFiles(){};

    public ImgFiles(String filename, String fileOriName, String fileurl){
        this.filename = filename;
        this.fileOriName = fileOriName;
        this.fileurl = fileurl;
    }

}
