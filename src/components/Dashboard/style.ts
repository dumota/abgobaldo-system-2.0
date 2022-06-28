import Link from "next/link";
import styled from "styled-components";
import { btnReset, v } from "../../../styles/variable";

interface Sidebar {
    isOpen: Function;
 };


export const Sidebar = styled.div`
    width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidht)};
    background: ${({ theme }) => theme.bg};
    height: 150vh;
    padding: ${v.lgSpacing};
    position: relative;
`;

export const Logo = styled.div`
    width: 52px;
    img{
        max-width: 100%;
        height: auto;
    }
    cursor: pointer;
    margin-bottom: ${v.lgSpacing};
    
`

export const SSidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: ${v.xxlSpacing};
    right: ${({ isOpen }) => (isOpen ? `-16px` : `-40px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg};
    box-shadow: 0 0 4px ${({ theme }) => theme.bg3}, 0 0 7px ${({ theme }) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({theme})=> theme.bg3};
    margin: ${v.lgSpacing} 0;
`

export const LinkContainer = styled.div`
    background: ${({ theme, isActive }) => (!isActive ? `transparent` : theme.bg3)};
    border-radius: ${v.borderRadius};
    margin:  8px 0;
    :hover{
        box-shadow: inset 0 0 0 1px ${({theme})=> theme.bg3};
    }
`

export const SLink = styled.div`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 16px;
    padding: calc(${v.smSpacing} -2px) 0;
    cursor: pointer;
    transition :0.2s ;
    :hover{
        background: gray;
    }
`

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;
    svg{
        font-size: 20px;
    }
`

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    margin-left:  ${v.smSpacing};
`



export const Stheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`

export const SThemeLabel = styled.span`
    display: block;
    flex: 1;
`

export const SThemeTooggler = styled.button`
    ${btnReset};
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background: ${({ theme, isActive }) => (!isActive ? theme.bg3 : theme.primary)};
  
    
    position: relative;
`
export const SToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition:0.2s ease right;
    right: calc(100% - 18px -1px);
    border-radius: 50%;
    background:black;
   
`



export const SLayout = styled.div`
    display: flex;
`

export const SMain = styled.div`
    padding: 20px;
    width: 100%;
    background: ${({theme})=> theme.bg3};
    color: ${({theme})=> theme.bg};
    
`