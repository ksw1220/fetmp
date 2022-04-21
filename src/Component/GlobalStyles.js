import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const globalStyles = createGlobalStyle`
    ${reset};
    *{
        padding: 0;
        margin: 0;
        user-select: none;
    }
    a{
        text-decoration:none;
        color: inherit;
    }
    body{
        box-sizing: border-box;
        font-family:'Noto Sans CJK KR';
    }
    input:focus{
    outline:none;
  }
  html,body{ 
      margin:0; 
      padding:0;
      width:100%; 
      height:100%;
      font-family:'Noto Sans CJK KR';
      }

  
`;
export default globalStyles;