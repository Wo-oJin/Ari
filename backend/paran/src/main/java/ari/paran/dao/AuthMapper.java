package ari.paran.dao;

import ari.paran.dto.SignupDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthMapper {

    public int userEmailCheck(String username);
    public void signup(SignupDto signupDto);

}
