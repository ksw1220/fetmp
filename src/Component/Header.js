import React, { useState } from "react";
import styled from "styled-components";

import WWLogo from "../Styles/Images/Logo.svg";

import { toast } from "react-toastify";


const Container = styled.div`
    display:flex;
    justify-content:space-between;
    padding: 15px 30px;
`;

const Logo = styled.a`
    display:flex;
    font-size:1.2rem;
    font-weight:bold;
`;

const LogoImg= styled.img`
    padding-bottom: 3px;
    width: 9rem;
`;

const List = styled.div`
    display:flex;
`;

const AuthBtn = styled.div`
    cursor:pointer;
    background-color: #000070;
    color:white;
    border-radius: 2rem;
    padding: 0 2rem;
    line-height: 2rem;
`;

const Link = styled.a`
    cursor:pointer;
    border: 2px solid #000070;
    box-sizing: border-box;
    color:#000070;
    border-radius: 2rem;
    padding:0 2rem;
    margin-right: 1rem;
    line-height: 2rem;
`;

export default () => {
    const isLogin =localStorage.getItem('login')
    const logout=()=>{
        toast("로그아웃 되었습니다")
        localStorage.removeItem('login');
        window.location.replace("/")
    }

    return (
        <Container>
            <Logo href ="/" >
                <LogoImg src = {WWLogo}/>
            </Logo>
            {
                (isLogin == undefined || isLogin == null) ? (
                    <List>
                    <AuthBtn onClick={()=>{window.location.replace("/#/auth")}}>LOGIN</AuthBtn>
                    {/* <AuthBtn onClick={()=>{window.location.replace("/auth")}}>LOGIN</AuthBtn> */}
                    </List>
                ) : (
                    <List>
                        <Link href="/#/myPage">MYPAGE</Link>
                        {/* <Link href="/myPage">MYPAGE</Link> */}
                        <AuthBtn onClick={()=>{logout()}}>LOGOUT</AuthBtn>
                    </List>
                )
            }

        </Container>
    );
}