import { React } from 'react';
import { Link } from "react-router-dom";
import MainButton from '../components/common/Mainbutton';
import styled from 'styled-components';
import Header from '../components/Header';

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginStore = () => {
    return (
        <>
            <Header text="로그인/회원가입" link="/loginRegister"></Header>
            <div className="logoContainer"LogoContainer></div>
            <ButtonContainer>
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
            </ButtonContainer>
        </>
    )
}

export default LoginStore;