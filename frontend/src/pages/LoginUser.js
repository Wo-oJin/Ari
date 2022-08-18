import { React } from 'react';
import { Link } from "react-router-dom";
import MainButton from '../components/common/Mainbutton';
import "./LoginUser.css";
import Header from '../components/Header';

const LoginUser = () => {
    return (
        <>
            <Header text="로그인/회원가입" link="/loginRegister"></Header>
            <div className="logoContainer"></div>
            
            <div className="buttonContainer">
                <div className="kakao">
                    <span>카카오로 로그인</span>
                </div>
                <div className="naver">
                    <span>네이버로 로그인</span>
                </div>
                
                <Link to="/login">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#4E514F"
                        text="이메일로 로그인"
                    />
                </Link>
                <div style={{ marginTop: "240px" }}>
                    <Link to="/signupUser">
                        <MainButton
                            radius="15px"
                            color="#FFFFFF"
                            background="#4E514F"
                            text="이메일로 회원가입"
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LoginUser;