import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, nameState } from "../state";
import axios from 'axios';
import { reissue } from '../services/jwt/reissue';

const RedirectLogin = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [name, setName] = useRecoilState(nameState);

    const navigate = useNavigate();

    const params = new URL(window.location.href).searchParams;
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const accessTokenExpireIn = params.get("accessTokenExpireIn");
    const authority = params.get("authority");
    const info = params.get("info");

    useEffect(() => {
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 일단 둘 다 localStorage에 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // accessToken 만료하기 1분 전에 로그인 연장
        const a = setTimeout(reissue, parseInt(accessTokenExpireIn - 60000));
        clearTimeout(a);

        // 사용자 권한을 recoil 변수에 저장
        if (authority === "ROLE_USER") { // 손님
            setAuth(1);
        } else if (authority === "ROLE_OWNER") { // 사장
            setAuth(2);
        } else if (authority === "ROLE_ADMIN") { // 관리자
            setAuth(3);
        }

        setName(info); // recoil
        
        alert('로그인에 성공했습니다.');
        navigate("/"); // 메인 페이지로 이동
    }, [])
    
    return (
        <>
            로딩중... 잠시만 기다려주세요.
        </>
    );
}

export default RedirectLogin;