import { React } from 'react';
import { Link } from "react-router-dom";
import MainButton from '../components/common/Mainbutton';
import styled from 'styled-components';
import "../styles/LoginUser.css";

const LogoContainer = styled.div`
    width: 170px;
    height: 75px;
    background: #D9D9D9;
    margin: 73px auto;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginUser = () => {
    return (
        <>
            <LogoContainer></LogoContainer>
            
            <ButtonContainer>
                {/* <MainButton
                    radius="15px"
                    color="#181600"
                    background="#FEE500"
                    text="카카오로 로그인">
                </MainButton> */}
                <div className="kakao" style={{
                    width: "260px",
                    height: "41px",
                    color: "#181600",
                    background: "#FEE500",
                    borderRadius: "15px",
                    textAlign: "center",
                    marginBottom: "11px"
                }}>
                    <span>카카오로 로그인</span>
                </div>
                {/* <div className="naver">
                    <MainButton className="naver"
                        radius="15px"
                        color="#FFFFFF"
                        background="#03C75A"
                        text="네이버로 로그인"
                    />
                </div> */}
                <div className="naver" style={{
                    width: "260px",
                    height: "41px",
                    color: "#FFFFFF",
                    background: "#03C75A",
                    borderRadius: "15px",
                    textAlign: "center",
                    marginBottom: "11px"
                }}>
                    <span style={{
                        position: "relative",
                        bottom: "13px"
                    }}>네이버로 로그인</span>
                </div>
                
                <Link to="/login">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#4E514F"
                        text="이메일로 로그인"
                    />
                </Link>
                <div style={{ margin: "240px" }}>
                    <Link to="/signupUser">
                        <MainButton
                            radius="15px"
                            color="#FFFFFF"
                            background="#4E514F"
                            text="이메일로 회원가입"
                        />
                    </Link>
                </div>
            </ButtonContainer>
        </>
    )
}

export default LoginUser;