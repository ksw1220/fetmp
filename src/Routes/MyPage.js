import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import MypageCalendar from '../Component/MypageCalendar';

import {Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Container = styled.div`
   display: flex;
   padding: 3% 13%;
   flex-direction: column;
   align-items: center;
   @media ${(props)=>props.theme.tablet}{
        padding: 5% 13%;
        margin-bottom: 1vh;
    }
    @media ${(props)=>props.theme.tablet}{
        padding: 5% 4vh;
    }
`;

// 상단
const Top = styled.div`
    color: #000070;
    font-size: 1.5rem;
    border-bottom: 2px solid #707070;
    margin-bottom: 3rem;
    padding-bottom: 0.3rem;
    width: 30%;
    text-align: center;
    @media ${(props)=>props.theme.tablet}{
        width: 70%;
    }
`;

// 중간
const Center = styled.div`
    width: 80%;
    text-align:center;
    background-color: #F3F3FF;
    border-radius: 1rem;
    @media ${(props)=>props.theme.tablet}{
        width: 100%;
    }
    @media ${(props)=>props.theme.mobile}{
        display: none;
    }
`;
const CalendarTop = styled.div`
    background-color: #000070;
    color: white;
    line-height: 2.5rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    @media ${(props)=>props.theme.tablet}{
        height: 9rem;
        line-height:3.5rem;
    }
`;

const MobCenter = styled.div`
    display: none;
    @media ${(props)=>props.theme.mobile}{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;
const MobCalendarTop = styled.div`
    background-color: #000070;
    color: white;
    line-height: 2.5rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 3vh;
`;

// 아래
const Bottom = styled.div`
    display: flex;
    width: 75%;
    margin-top:4rem;
    @media ${(props)=>props.theme.tablet}{
        width: 100%;
    }
`;


const Forms = styled.div`
    background-color: #000070;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 4.5rem;
    border-radius: 8px;
`;

const Info = styled.div`
    background-color: white;
    color: #000070;
    text-align: center;
    margin-bottom: 1rem;
    width: 25%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-bottom: 8px;
    @media ${(props)=>props.theme.mobile}{
      width:40%;
    }
`;
const Flist = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
`;

const LeftBtn = styled.div`
    background-color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    text-align: center;
    line-height: 2rem;
    margin: 1.2rem -1rem;
    position: absolute;
    color: #000070;
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
`;
const RightBtn = styled.div`
    width: 2rem;
    height: 2rem;
    background-color: white;
    margin: 1.2rem -1rem;
    position: inherit;
    border-radius: 100%;
    text-align: center;
    line-height: 2rem;
    color: #000070;
    font-weight: bold;
    font-size: 1.3rem;
    cursor: pointer;
`;

const Form = styled.div`
    font-size: 0.9rem;
    margin-bottom: 5px;
`;
const Line = styled.div`
    height: 1px;
    background-color: white;
    width: 70%;
    margin: 0 auto;
`;




function MyPage() {
    const [name, setName] = useState("");
    const [dates, setDates] = useState([]); // 일정 있는 날들
    const [myForms, setMyForms] = useState([]);
    const [myidx, setMyidx] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [scheduleList,setScheduleList] = useState([]);


    useEffect(()=>{
        axios.post("http://localhost:8080/api/get-my-schedule",{
            idToken : localStorage.getItem("login"),
      }).then(function (response) {
        if(!response.data.success){
            alert("일정 불러오기에 실패하였습니다.")
        }else{
            setDates(response.data.dates);
        }
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [scheduleList])


    useEffect(()=>{        
        axios.post("http://localhost:8080/api/get-my-page",{
            idToken :localStorage.getItem("login"),
        }).then(function (response) {
            if(!response.data.success){
                alert("폼 불러오기에 실패하였습니다.")
            }else{
                setName(response.data.nickName);
                setMyForms(response.data.schedules);
                setLoading(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    },[])


    const left = ()=>{
        if(myidx === 0){
            toast("일정의 끝입니다.", {autoClose: 3000});
        }
        else{
            setMyidx(myidx-1);
        }
    }
    const right = ()=>{
        if(myidx ===Math.ceil(myForms.length/4)-1){
            toast("일정의 끝입니다.", {autoClose: 3000});
        }
        else{
            setMyidx(myidx+ 1);
        }
    }            

    return (
        <Container>
            {loading ? <></> :
            <>
                <Top>환영합니다, {name}님</Top> 

                <Center>
                    <CalendarTop>내캘린더</CalendarTop>
                    <MypageCalendar dates ={dates} scheduleList={scheduleList} setScheduleList={setScheduleList}/> 
                </Center>

                <MobCenter>
                    <MobCalendarTop>내캘린더</MobCalendarTop>
                    <MypageCalendar dates ={dates} scheduleList={scheduleList} setScheduleList={setScheduleList}/> 
                </MobCenter>

                

                <Bottom>
                    <LeftBtn onClick = {()=>{left();}}>&lt;</LeftBtn>
                    <Forms>
                            <Info>최근 생성한 일정</Info>
                            <Flist>
                                {myForms.slice(myidx*4, (myidx+1)*4).map((myform, key)=>{
                                    const url = "/result/" + myform.scheduleKey;
                                        return (
                                            <Link to ={url} key = {key}>
                                                <Form>{myform.scheduleName}</Form>
                                                <Line/>
                                            </Link>
                                        )
                                    }
                                )}                           
                            </Flist>
                    </Forms>
                    <RightBtn onClick = {()=>{right();}}>&gt;</RightBtn>

                </Bottom>
            </>
            }

        </Container>
    )
};

export default MyPage;