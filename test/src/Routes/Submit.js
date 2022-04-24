import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import SubmitCalendar from '../Component/SubmitCalendar';
import Button from '../Component/Button';
import MobileButton from '../Component/MobileButton';
import useInput from '../Hooks/useInput';
import axios from 'axios';
import moment from 'moment';


const Container = styled.div`
    display: flex;
    padding: 2% 6%;
    @media ${(props)=>props.theme.tablet}{
        padding: 3% 6vh;
        flex-direction: column;
    }
`;

const InfoContainer = styled.div`
   width:40%;
   padding-top:150px;
   display: flex;
   flex-direction:column;
   align-items: center;
   @media ${(props)=>props.theme.tablet}{
        display: none;
    }
`;

const DayContainer = styled.div`
    width: 60%;
    @media ${(props)=>props.theme.tablet}{
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
`;
const MyDays = styled.div`
    text-align: center;
    font-size: 1.2rem;
`;

const Btns = styled.div`
    display: flex;
    margin-top: 14px;
    justify-content: center;

`;

const Test = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 4rem;
`;

const TabTest = styled.div`
    display: none;
    @media ${(props)=>props.theme.tablet}{
        display: flex;
        flex-direction: column;
        text-align: center;
        margin: 3vh 0;
    }
`;

const Des = styled.div`
    font-size: 1.8rem;
    @media ${(props)=>props.theme.tablet}{
        font-size: 2.5vh;
    }
`;

const TestDay = styled.div`
    width: 6rem;
    padding: 0 3px;
    box-sizing: border-box;
    text-align:center;
    cursor:pointer;
    height: 4rem;
    line-height: 4rem;
    font-size: 2.5rem;
    margin: 20px auto;
`;

const TabInfo = styled.div`
    display: none;
    @media ${(props)=>props.theme.tablet}{
        display: flex; 
    }
`;

function Submit({match}) {
    const [loading, setLoading] = useState(true); //로딩

    const [startDate, setStartDate] = useState(moment()); 
    const [endDate, setEndDate] = useState(moment());
    const [formName, setFormName] = useState("");
    const [testClick, setTestClick] = useState(0);

    const [checkDays, setCheckDays] = useState([]); // 폼 체크된것 

    useEffect(()=>{
        axios.post("http://localhost:8080/api/get-submit-page",{
            scheduleKey : match.params.id,
            idToken :localStorage.getItem("login"),
        }).then(function (response) {
            if(!response.data.success){
                alert("폼 불러오기에 실패하였습니다.")
            }else{
                setStartDate(moment(response.data.startDate));
                setEndDate(moment(response.data.endDate));
                setFormName(response.data.scheduleName)
                setLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    },[])


    const sendCalendar = (calendar) => {
        axios.post("http://localhost:8080/api/submit/member-schedule",{
            scheduleKey : match.params.id,
            idToken :localStorage.getItem("login"),
            dates : checkDays
        }).then(function (response) {
            if(!response.data.success){
                alert("폼 제출에 실패하였습니다.")
            }else{
                window.location.replace("/#/result/submit/" + match.params.id);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    const abandon = () => {
        axios.post("http://localhost:8080/api/abandon",{
            scheduleKey : match.params.id,
            idToken :localStorage.getItem("login"),
        }).then(function (response) {
            if(!response.data.success){
                alert("참여 포기에 실패하였습니다..")
            }else{
                window.location.replace("/#/result/submit");
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    
    return (
        <>
        {loading ? (<></>): (
            <Container>
            <DayContainer>
                <Info>
                    <Title>{formName}</Title>
                    <MyDays>{startDate.format("YYYY-MM-DD")} ~ {endDate.format("YYYY-MM-DD")}</MyDays>

                    <TabTest>
                    <Des>클릭해보세요</Des>
                        {testClick === 0 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #008000' }}>1</TestDay>
                            <Des >가능한 날</Des>
                        </>
                        }
                        {testClick === 1 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #EA2027' }}>1</TestDay>
                            <Des >불가능한 날</Des>
                        </>
                        }
                        {testClick === 2 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #FFC312' }}>1</TestDay>
                            <Des >조정 가능한 날</Des>
                        </>
                        }
                </TabTest>

                    <Btns>
                        <Button fontSize="1.8vh" content="일정참여 포기하기" backgroundColor="#7953D2" marginRight="4rem" marginRightTab="3vh" onClick = {abandon}/>
                        <Button fontSize="1.8vh" content="내 일정 불러오기" backgroundColor="#000070" />
                    </Btns>
                </Info>
                {!loading && <SubmitCalendar startDate = {startDate} endDate={endDate} checkDays={checkDays} setCheckDays={setCheckDays}/>}
                
            </DayContainer>
            <InfoContainer>
                <Test>
                    <Des>클릭해보세요</Des>
                        {testClick === 0 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #008000' }}>1</TestDay>
                            <Des >가능한 날</Des>
                        </>
                        }
                        {testClick === 1 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #EA2027' }}>1</TestDay>
                            <Des >불가능한 날</Des>
                        </>
                        }
                        {testClick === 2 && 
                        <>
                            <TestDay onClick={() => { setTestClick((testClick + 1) % 3) }} style={{ borderBottom: '4px solid #FFC312' }}>1</TestDay>
                            <Des >조정 가능한 날</Des>
                        </>
                        }
                </Test>
                <Button backgroundColor="#000070" content="제출하기"  onClick={() => { sendCalendar(); }}></Button>

            </InfoContainer>
            <TabInfo>
                <Button backgroundColor="#000070" content="제출하기"  onClick={() => { sendCalendar(); }}></Button>
            </TabInfo>
        </Container>
        )}
        </>
        
    );
}

export default Submit;
