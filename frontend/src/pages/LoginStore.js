import { React } from 'react';
import { Link } from "react-router-dom";
import MainButton from '../components/common/Mainbutton';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginStore = () => {
    return (
        <>
            <ButtonContainer>
                <Link to="/login">
                    <MainButton
                        radius="15px"
                        color="#FFFFFF"
                        background="#4E514F"
                        text="이메일로 로그인"
                    />
                </Link>
                <Link to="/signupStore">
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