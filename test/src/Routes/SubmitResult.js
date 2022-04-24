import React, { useState } from 'react';
import styled from "styled-components";
import Button from '../Component/Button';
import MobileButton from '../Component/MobileButton';
import SubmitResult from "../Styles/Images/SubmitResult.svg";
import SubmitResultMobile from "../Styles/Images/SubmitResultMobile.svg";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10%;

`;

const Img = styled.img`
    width: 70%;
    margin: -20% auto;
    @media ${(props)=>props.theme.tablet}{
        width: 90%;
        margin: -1vh auto 5vh;
    }
    @media ${(props)=>props.theme.mobile}{
        display: none;
    }
`;
const MobImg = styled.img`
    display: none;
    @media ${(props)=>props.theme.mobile}{
        display: block;
        width: 90%;
        margin: -1vh auto 5vh;
    }
`;

const Btns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: -1rem;
    @media ${(props)=>props.theme.tablet}{
        flex-direction: column;
    }
`;



export default ({match}) => {
    const title = "멋쟁이 사자처럼 해커톤 회의";
    return (
    <Container>
        <Img src = {SubmitResult}/>
        <MobImg src = {SubmitResultMobile}/>
        <Btns>
            <Button backgroundColor="#7953D2" content="수정하기" marginRight="2.5rem"/>
            <Button backgroundColor="#000070" content="결과보기" onClick={()=>{window.location.replace("/#/result/"+match.params.id)}}/>
            <MobileButton backgroundColor="#7953D2" width = "100%" content="수정하기" marginBottom="1vh"/>
            <MobileButton backgroundColor="#000070" width = "100%" content="결과보기" onClick={()=>{window.location.replace("/#/result/"+match.params.id)}}/>
        </Btns>
    </Container>
    );
}