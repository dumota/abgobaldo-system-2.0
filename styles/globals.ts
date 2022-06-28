import { createGlobalStyle, useTheme } from "styled-components";



export default createGlobalStyle`
    *,*::before, *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
       
    }
    body{
        background: ${({ theme }) => theme.bg2};
        z-index: 1;
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
       
    }
`;