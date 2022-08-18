import { React } from 'react';
import { Link } from "react-router-dom";
import MainButton from '../components/common/Mainbutton';
import Header from '../components/Header';

const LoginStore = () => {
    return (
        <>
            <Header text="로그인/회원가입" link="/loginRegister"></Header>
            <div className="logoContainer"></div>
            <div className="buttonContainer">
                <Link to="/login">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#4E514F"
                        text="이메일로 로그인"
                    />
                </Link>
                <Link to="/signupOwner">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#4E514F"
                        text="이메일로 회원가입"
                    />
                </Link>
            </div>
        </>
    )
}

export default LoginStore;