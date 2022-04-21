import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import Button from '../Component/Button';
import resultPreview from "../Styles/Images/resultPreview.svg";
import ResultCalendar from '../Component/ResultCalendar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import axios from 'axios';

import {CopyToClipboard} from 'react-copy-to-clipboard'; // 클립보드 복붙용


const Container = styled.div`
    display: flex;
    padding: 5%;
    @media ${(props)=>props.theme.tablet}{
        flex-direction: column;
        align-items: center;
    }
    @media ${(props)=>props.theme.mobile}{
        padding: 5% 0;
    }
`;

// 왼쪽
const Left = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-self: center;
    text-align: center;
    @media ${(props)=>props.theme.tablet}{
        display:none;
    }
`;
const PeopleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000070;
`;

const TabPeopleContainer = styled.div`
    display:none;
    flex-direction: column;
    align-items: center;
    color: #000070;
    @media ${(props)=>props.theme.tablet}{
        display:flex;
        flex-direction: row;
        justify-content:center;
        margin-bottom : 3vh;
    }
`;
const PeopleNum = styled.div`
    border: 2px solid #000070;
    border-radius: 1rem;
    padding: 3px;
    width: 30%;
    text-align: center;
    margin-top: 1rem;
    @media ${(props)=>props.theme.tablet}{
        margin-top: 0;
    }
`;
const PeopleTxt = styled.div`
    margin-bottom: 1rem;
    @media ${(props)=>props.theme.tablet}{
        margin: 0 2vh;
    }
`;
const PeopleImg = styled.img`
    width: 65%;
    margin: 4rem auto 0;

`;


// 가운데
const DayContainer = styled.div`
    width: 60%;
    @media ${(props)=>props.theme.tablet}{
        width: 80%;
        margin-bottom: 3vh;
    }
    @media ${(props)=>props.theme.mobile}{
        width: 100%;
    }
`;
const Title = styled.div`
    border-bottom: 3px solid #E2E2E2;
    text-align: center;
    padding-bottom: 7px;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;

`;
const Info = styled.div`
    width: 50%;
    margin: 0 auto 2rem;
    color: #000070;
    @media ${(props)=>props.theme.tablet}{
        width: 60%;
    }
`;
const MyDays = styled.div`
    text-align: center;
    font-size: 1.2rem;
`;

// 오른쪽
const InfoContainer = styled.div`
   width:20%;
   display: flex;
   flex-direction:column;
   align-items: center;
   align-self: center;
   @media ${(props)=>props.theme.tablet}{
        flex-direction:row;
        width: 50%;
    }
`;


export default ({match})=> {
    const [loading, setLoading] = useState(true); //로딩

    const [startDate, setStartDate] = useState(moment()); 
    const [endDate, setEndDate] = useState(moment());
    const [formName, setFormName] = useState("");
    const [expectedMemberCnt, setExpectedMemberCnt] = useState();
    const [joinedMemberCnt, setJoinedMemberCnt] = useState();
    const [checkDays, setCheckDays] = useState([]); // 폼 체크된것 

    const url = 'http://whenwhen.hyu-likelion.org/#/submit/'+match.params.id; //submit url mapping
    const [copy, setCopy] = useState(false);

    const getDateFormat = date => {
        return date.format("YYYY-MM-DD");
    }

    useEffect (()=>{
        axios.post("http://localhost:8080/api/get-result-page",{
          scheduleKey : match.params.id,
      }).then(function (response) {
        if(!response.data.success){
            alert("폼 불러오기에 실패하였습니다.")
        }else{
          setStartDate(moment(response.data.startDate));
          setEndDate(moment(response.data.endDate));
          setFormName(response.data.scheduleName)
          setCheckDays(response.data.dates)
          setExpectedMemberCnt(response.data.expectedMemberCnt)
          setJoinedMemberCnt(response.data.joinedMemberCnt)
          setLoading(false);
        }
        })
        .catch(function (error) {
          console.log(error);
        })
      },[]) 


      const Del = ()=>{
        axios.post("http://localhost:8080/api/delete-schedule",{
            hostIdToken: localStorage.getItem("login"),
            scheduleKey : match.params.id,
        }).then(function (response) {
          if(!response.data.success){
              alert("폼 삭제에 실패하였습니다.")
          }else{
            window.location.replace("/#/myPage");
          }
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    return (
        <Container>
            <Left>
                <PeopleContainer>
                    <PeopleTxt>제출인원</PeopleTxt>
                    <FontAwesomeIcon icon={faUser} style = {{fontSize: "4rem"}}/>
                    <PeopleNum> {joinedMemberCnt} / {expectedMemberCnt}</PeopleNum>
                </PeopleContainer>
                <PeopleImg src = {resultPreview}/>
            </Left>
            <DayContainer>
                <Info>
                    <Title>{formName}</Title>
                    <MyDays>{getDateFormat(startDate)} ~ {getDateFormat(endDate)}</MyDays>
                </Info>

                <TabPeopleContainer>
                    <FontAwesomeIcon icon={faUser} style = {{fontSize: "3.5vh"}}/>
                    <PeopleTxt>제출인원</PeopleTxt>
                    <PeopleNum> {joinedMemberCnt} / {expectedMemberCnt}</PeopleNum>
                </TabPeopleContainer>

                {!loading &&
                <ResultCalendar formName = {formName} submitStatus={joinedMemberCnt+ ' / ' +expectedMemberCnt} scheduleKey= {match.params.id} startDate={startDate} endDate={endDate} checkDays={checkDays}/> 
                }

            </DayContainer>
            <InfoContainer>
                <input text={url} style={{display: "none"}}/>
                <CopyToClipboard text={url} onCopy={() => setCopy(true)}>
                    <Button backgroundColor="#000070" content="링크 복사하기" marginBottom= "1rem" marginRightTab="3vh"/>
                </CopyToClipboard>
                <Button backgroundColor="#7953D2" content="일정 삭제하기" onClick={() => Del()}/>
            </InfoContainer>
        </Container>
    )
}

