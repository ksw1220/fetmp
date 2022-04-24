import React, { useState } from 'react';
import styled from "styled-components";
import { ko } from 'react-date-range/dist/locale';

import { DateRange } from 'react-date-range';
import '../Styles/Form.css'
import useInput from '../Hooks/useInput';
import Button from '../Component/Button';
import MobileButton from '../Component/MobileButton';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import moment from 'moment';


const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 4rem 20%;
    @media ${(props)=>props.theme.mobile}{
        padding: 4rem 10%;
    }
`;

const Buttons = styled.div`
    display:flex;
    justify-content:center;
    margin-top: 5rem;
    text-align: center;
    color:white;
    @media ${(props)=>props.theme.mobile}{
        flex-direction: column;
        align-items: center;
    }
`;

const Name = styled.input`
    width: 60%;
    margin: 0 20% 20px;
    font-size: 1.3rem;
    border: none;
    border-bottom: 2px solid #E2E2E2;
    font-family: 'Noto Sans CJK KR';
    text-align: center;
`;

const PeopleNum = styled.div`
    display: flex;
    justify-content: center;
    color: #000070;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    align-items: center;
`;
const PeopleTxt = styled.div`
    margin: 0 1rem;
`;

const NumController = styled.div`
    display: flex;
    align-items: center;
`;

const PM = styled.div`
    font-size: 2rem;
    cursor: pointer;
`;

const Num = styled.div`
    border: 2px solid #000070;
    border-radius: 2rem;
    width: 7rem;
    text-align: center;
    margin: 0 0.5rem;
`;

const DateRangeDes = styled(DateRange)`
  @media ${(props)=>props.theme.tablet}{
        display: none;
    }
`;

const DateRangeTab = styled(DateRange)`
display: none;
  @media ${(props)=>props.theme.tablet}{
        display: flex;
    }
`;




export default ({props}) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
            color: "#BBBBFF"
        }
    ]);
    const name = useInput(""); //폼 이름
    const [num, setNum] = useState(1); // 폼 인원수

console.log(`${(props)=>props.theme.tablet}`);
    

    const make=()=>{
        const Start = moment(state[0].startDate);
        const End = moment(state[0].endDate);
        axios.post("http://localhost:8080/api/create-schedule", {
            scheduleName: name.value,
            expectedMemberCnt : num,
            hostIdToken:localStorage.getItem("login"),
            startDate : Start.format("YYYY-MM-DD"),
            endDate : End.format("YYYY-MM-DD"),
          })
          .then(function (response) {
              if(!response.data.success)
                alert("폼 생성에 실패하였습니다.");
                else{
                    window.location.replace("/#/submit/"+response.data.scheduleKey)
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <Container>
            <Name {...name} placeholder ="일정 이름"></Name>
            <PeopleNum>
                <FontAwesomeIcon icon={faUser}/>
                <PeopleTxt> 인원설정 </PeopleTxt>
                <NumController>
                    <PM onClick ={()=>{if(num ==1) alert("인원수는 1명 이상이어야합니다."); else setNum(num-1);}}> - </PM>
                    <Num>{num}</Num>
                    <PM onClick ={()=>{setNum(num+1)}}> + </PM>
                </NumController>

            </PeopleNum>                
            <DateRangeDes
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    locale={ko}
                    months={2}
                    direction="horizontal"
                />   

            <DateRangeTab
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                locale={ko}
                months={1}
                direction="vertical"
                />
            <Buttons>
                <Button onClick={()=>{window.location.replace("/")}} content="취소" backgroundColor="#7953D2" marginRight="20px" marginRightTab="2vh"/>
                <Button onClick={()=>{make()}} content="일정 생성하기" backgroundColor="#000070"/>
                <MobileButton onClick={()=>{window.location.replace("/")}} content="취소" backgroundColor="#7953D2" marginBottom="20px" marginRightTab="2vh" width="80%"/>
                <MobileButton onClick={()=>{make()}} content="일정 생성하기" backgroundColor="#000070" width="80%"/>
            </Buttons>

        </Container>
    )
}
