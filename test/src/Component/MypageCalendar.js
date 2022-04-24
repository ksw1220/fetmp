import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from "styled-components";
import Popup from "reactjs-popup";
import MypageSchedule from '../Routes/MypageSchedule';


const Container = styled.div`
    width: 70%;
    margin: 2rem auto;
    background-color: white;
    border-radius: 1rem;
    padding: 2%;
    @media ${(props)=>props.theme.tablet}{
      margin: -5rem auto 2rem;
    }
    @media ${(props)=>props.theme.mobile}{
      margin: 0;
      width: 100%;
    }
`;
const Controller = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 1.5rem;
    color: #000070;
`;
const Btn = styled.div`
    font-weight: bold;
    cursor: pointer;
`;
const Month = styled.span`
    margin: 0 10px;
    @media ${(props)=>props.theme.tablet}{
      font-size: 2vh;
    }
    @media ${(props)=>props.theme.mobile}{
      font-size: 3vh;
    }
`;

const WeekDayRow = styled.div`
    display:flex;
    cursor: pointer;
`;
const WeekDay = styled.div`
    width: calc(100%/7);
    padding: 0 3px;
    box-sizing: border-box;
    text-align: center;
    color: #BEBEBE;
    line-height: 5rem;
    font-size: 1.2rem;
    @media ${(props)=>props.theme.tablet}{
      font-size: 1.7vh;
    }
    @media ${(props)=>props.theme.mobile}{
      font-size: 2vh;
    }
`;


const CalendarContainer = styled.table`
    width:100%;
`;
const Days = styled.tbody`
    text-align: center;
`;
const Week = styled.tr`
`;
const DayContainer = styled.td`
    cursor: pointer;
    line-height: 5rem;
    font-size: 1.2rem;
    border-radius:1rem;
    :hover{
      background-color:#F3F3FF;
    }
`;
const Day = styled.span`
    @media ${(props)=>props.theme.tablet}{
      font-size: 1.7vh;
    }
    @media ${(props)=>props.theme.mobile}{
      font-size: 2.3vh;
    }
`;
const Point = styled.div`
    position: relative;
    top: -19px;
    left: 48%;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #7953D2;
`;

const contentStyle = {
  width: "80vh",
  height: "36rem",
  padding: "0px",
  backgroundColor: "#F3F3FF"
  
};

const X = styled.div`
    cursor: pointer;
    position: absolute;
    right: -1.6rem;
    top: -1.2rem;
    font-size: 1.7em;
    color: #e5eaee;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 100%;
    background-color: #7953D2;
`;

export default ({dates, scheduleList, setScheduleList}) => { 
    const [getMoment, setMoment]=useState(moment());     
    const [checkDay, setCheckDay]=useState(moment());     
    const today = getMoment;    // today == moment()   입니다.
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const WeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const [loading, setLoading] = useState(false);

    const days_row = WeekDays.map((day) => (
            <WeekDay>{day}</WeekDay>
        )
    );
    const calendarArr=()=>{
        let result = [];
        let week = firstWeek;

        for ( week; week <= lastWeek; week++) {
          result = result.concat(
            <Week key={week}>
                {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');

                
                    // case 1. 이번달이 아닌경우
                  if(days.format('MM') !== today.format('MM')){
                    return(
                        <DayContainer key={index}/>
                    );
                  }
                  // case 2. 클릭된거
                  else if (checkDay.format('YYYYMMDD') === days.format('YYYYMMDD')){
                    return(
                      <Popup
                            trigger={
                              <DayContainer key={index} style={{backgroundColor:"#BBBBFF", color:"white"}} >
                                <Day >{days.format('D')}
                                </Day>
                                {dates.includes(days.format('YYYY-MM-DD')) && <Point/>}
                              </DayContainer>
                            }
                            modal
                            contentStyle={contentStyle}
                            lockScroll={true}>
                            {close => (
                                <>
                                    <X onClick={close}>&times; </X>
                                    <MypageSchedule day = {days} scheduleList={scheduleList} setScheduleList={setScheduleList}/>
                                </>
                            )}
                        </Popup>
                  );
                  }
                  // 기본
                  else{
                    return(
                        <DayContainer key={index} onClick ={()=>{setCheckDay(days)}} >
                          <Day >{days.format('D')}
                          </Day>
                          {dates.includes(days.format('YYYY-MM-DD')) && <Point/>}

                        </DayContainer>
                    );
                  }

              })
            }
            </Week>);
        }
        return result;
      }


    return (
      <>
      {loading ? (
        <></>
      ):(
        <Container>
          <Controller>
            <Btn onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>&lt; </Btn>
            <Month>{today.format('YYYY 년 MM 월')}</Month>  
            <Btn onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>&gt;</Btn>
          </Controller>
          <WeekDayRow>
              {days_row}
          </WeekDayRow>
          <CalendarContainer>
          <Days>
              {calendarArr()}
          </Days>
          </CalendarContainer>
        </Container>
      )}
    </>
    );
}