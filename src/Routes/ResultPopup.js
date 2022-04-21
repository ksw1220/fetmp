import React, { useState, useEffect } from 'react';
import useInput from '../Hooks/useInput';
import moment from 'moment';
import Clip from "../Styles/Images/Clip.svg";
import MypageModal from "../Styles/Images/MypageModal.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import axios from 'axios';
import { toast } from "react-toastify";
import Scrollbars from 'react-custom-scrollbars';



const Container = styled.div`
    text-align:center;
    color:#000070;
    display: flex;
    flex-direction: column;
`;

const Top = styled.div`
    display: flex;
    background-color: #E2E2FF;
    padding: 3% 5%;
    height: 4.5rem;
`;

const ClipImg = styled.img`
    position: absolute;
    width: 2.5rem;
    top: -10px;
    left: 44px;
`;

const Date = styled.div`
    font-size: 1rem;
    width: 15%;
    background-color: white;
    border-radius: 0.5rem;
    margin-right: 1rem;
    line-height: 1.3rem;
    overflow: hidden;
`;
const BluePart = styled.div`
    background-color: #000070;
    margin-bottom: 5px;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    justify-content: center;
    width: 80%;
    flex-direction: column;
`;
const Title = styled.div`
    font-size: 1.2rem;
    width: 90%;
    border-bottom: 2px solid white;
    padding-bottom: 5px;
    margin-bottom: 6px;
`;
const DateRange = styled.div`
    font-size: 0.8rem;
`;

const Schedules = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4%;
`;
const All = styled.div`
    display: flex;
    padding: 18px 0;
    border-bottom: 2px solid #E2E2E2;
`;
const Possible = styled.div`
    display: flex;
    padding: 18px 0;
    border-bottom: 2px solid #E2E2E2;
    color:#009432;
`;
const Adjust = styled.div`
    display: flex;
    padding: 18px 0;
    border-bottom: 2px solid #E2E2E2;
    color: #FFC312;
`;
const Impossible = styled.div`
    display: flex;
    padding: 18px 0;
    border-bottom: 2px solid #E2E2E2;
    color: #EA2027;
`;

const Left = styled.div`
    flex: 1.5;
    text-align: left;
    display: flex;
    align-items: center;
`;
const Txt = styled.div`
    margin-left: 10px;
`;
const Allpeople = styled.div`
    flex: 3;
    background-color: #000070;
    border-radius: 1rem;
    color: white;
`;
const Right = styled.div`
    flex: 3;
    display: flex;
    flex-wrap:wrap;
`;
const Node = styled.div`
    color: white;
    background-color: #E2E2E2;
    padding: 7px 15px;
    border-radius: 1rem;
    font-size: 0.8rem;
    margin-right: 7px;
    margin-bottom: 7px;
`;
const L = styled.div`
    cursor: pointer;
    position: absolute;
    right: -8vh;
    top: 37%;
    font-size: 2.7em;
    color: #e5eaee;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 100%;
`;

const R = styled.div`
    cursor: pointer;
    position: absolute;
    left: -8vh;
    top: 37%;
    font-size: 2.7em;
    color: #e5eaee;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 100%;
`;


export default ({scheduleKey, date, submitStatus, startDate, endDate, formName})=> {
    const [availability,setAvailability] = useState([]);
    const [loading,setLoading] = useState(false);
    const [check, setCheck] = useState(true);
    
    useEffect (()=>{
        axios.post("http://localhost:8080/api/get-result-page-modal",{
          scheduleKey : scheduleKey,
          date : date.format("YYYY-MM-DD"),
      }).then(function (response) {
        if(!response.data.success){
            alert("폼 불러오기에 실패하였습니다.")
        }else{
            setAvailability(response.data.availability)
            setLoading(false);
        }
        })
        .catch(function (error) {
          console.log(error);
        })
      },[check]) 

      const Lfunc = () =>{
          if(date.isSame(endDate)){
            toast("마지막 날짜입니다.", {autoClose: 3000})
          }else{
            date.add(1,'days');
            setCheck(!check);
          }
      }

      const Rfunc = () =>{
        if(date.isSame(startDate)){
          toast("시작 날짜입니다.", {autoClose: 3000})
        }else{
            date.subtract(1,'days')
          setCheck(!check);
        }
    }

    return (
        <Container>
                <L onClick = {()=>{Lfunc()}}>&gt; </L>
                 <R onClick = {()=>{Rfunc()}}>&lt; </R>
            <Top>
                <ClipImg src = {Clip}/>
                <Date>
                    <BluePart>.</BluePart>
                    {date.format("D")}일
                </Date>
                <Info>
                    <Title>{formName}</Title>
                    <DateRange>{startDate.format("YYYY-MM-DD")} ~ {endDate.format("YYYY-MM-DD")} </DateRange>
                </Info>
            </Top>
            <Schedules>
                <Scrollbars style ={{height :"19rem"}}>
                    <All>
                        <Left>
                            <FontAwesomeIcon icon = {faUser} style= {{fontSize: "1.4rem"}}/>
                            <Txt>제출 인원</Txt>
                        </Left>
                        <Allpeople>{submitStatus}</Allpeople>
                    </All>     
                    <Possible>
                        <Left>
                            <FontAwesomeIcon icon = {faUser} style= {{fontSize: "1.4rem"}}/>
                            <Txt>가능한 인원</Txt>
                        </Left>
                        <Right>
                            {availability.map((avail, key)=>{
                                        return (
                                            <>
                                            {avail.availabilityToLong == 0 ? <Node style ={{backgroundColor:"#009432"}}>{avail.nickName}</Node> : <Node>{avail.nickName}</Node> }
                                            </>
                                        )
                                    }
                                )}   
                        </Right>
                    </Possible>      
                    <Adjust>
                        <Left>
                            <FontAwesomeIcon icon = {faUser} style= {{fontSize: "1.4rem"}}/>
                            <Txt>조정 가능한 인원</Txt>
                        </Left>
                        <Right>
                            {availability.map((avail, key)=>{
                                        return (
                                            <>
                                            {avail.availabilityToLong == 2 ? <Node style ={{backgroundColor:"#FFC312"}}>{avail.nickName}</Node> : <Node>{avail.nickName}</Node> }
                                            </>
                                        )
                                    }
                                )}   
                        </Right>
                    </Adjust>   
                    <Impossible>
                        <Left>
                            <FontAwesomeIcon icon = {faUser} style= {{fontSize: "1.4rem"}}/>
                            <Txt>불가능한 인원</Txt>
                        </Left>
                        <Right>
                            {availability.map((avail, key)=>{
                                        return (
                                            <>
                                            {avail.availabilityToLong == 1 ? <Node style ={{backgroundColor:"#EA2027"}}>{avail.nickName}</Node> : <Node>{avail.nickName}</Node> }
                                            </>
                                        )
                                    }
                                )}   
                        </Right>
                    </Impossible>
                </Scrollbars>
            </Schedules>
        </Container>
        )
}