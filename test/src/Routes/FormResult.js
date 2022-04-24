import React, { useState } from 'react';
import styled from "styled-components";
import Button from '../Component/Button';
import FormResult from "../Styles/Images/FormResult.svg";
import {CopyToClipboard} from 'react-copy-to-clipboard'; // 클립보드 복붙용


const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10%;

`;

const Img = styled.img`
    width: 70%;
    margin: -20% auto;
`;

const Btns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: -2rem;
`;



export default ({match}) => {
    const title = "멋쟁이 사자처럼 해커톤 회의";

    const url = 'http://whenwhen.hyu-likelion.org/#/submit/'+match.params.id; //submit url mapping
    const [copy, setCopy] = useState(false);

    return (
    <Container>
        <Img src = {FormResult}/>
        <Btns>
            <input text={url} style={{display: "none"}}/>
            <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
                <Button backgroundColor="#000070" content="링크 복사하기" marginRight="2.5rem"/>
            </CopyToClipboard>
            <Button backgroundColor="#7953D2" content="메인화면" onClick={()=>{window.location.replace("/")}}/>
        </Btns>
    </Container>
    );
}