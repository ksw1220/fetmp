import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Btn = styled.button`
    background-color: ${props => props.backgroundColor};
    margin-right: ${props => props.marginRight};
    margin-bottom: ${props => props.marginBottom};
    width: ${props => props.width || "9rem"};  // 디폴트 값이 9rem
    font-size: ${props => props.fontSize || "1rem"};;
    padding: 13px 8px;
    color: white;
    border-radius: 3rem;
    box-shadow: 1px 2px 5px #bfbfbf;
    cursor: pointer;
    border:none;
    font-family: 'Noto Sans CJK KR';
    @media ${(props)=>props.theme.tablet}{
        width: 80%;
        margin: 0 auto 2vh;
        margin-right: ${props => props.marginRightTab};
    }
    @media ${(props)=>props.theme.mobile}{
        display: none !important;
    }
`;

/*
    content - 들어가는 내용 (버튼에 나오는 글씨 ex- 취소)
    background color, width, marginright - css 관련 옵션들. (background color는 꼭 넣어줘야됨.)
    onclick - 버튼 클릭시 작동되는 함수.
    입력 타입은 하단 props 참고.
*/
const Button = ({onClick, content, backgroundColor, width, marginRight, fontSize, marginBottom, marginRightTab }) => (
    <Btn onClick={onClick} backgroundColor={backgroundColor} width={width} marginRight={marginRight} fontSize={fontSize} marginBottom={marginBottom} marginRightTab={marginRightTab}>
        {content}
    </Btn>
);

Button.propTypes = {
    onClick : PropTypes.func,
    backgroundColor :PropTypes.string.isRequired,
    width :PropTypes.string,
    marginRight :PropTypes.string,
    fontSize: PropTypes.string,
    marginBottom : PropTypes.string,
};

export default Button;