import styled from "styled-components";

export const ModalView= styled.div`
    position: fixed;
    z-index: 2;
    background-color: rgb(0,0,0,0.8);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    div{
        background: white;
        color: black;
        height: 90%;
        width: 50%;
        border-radius: 20px;
        box-shadow: 5px 5px 15px black;
        div{
           
            height: 100%;
            width: 100%;
           
            box-shadow: none;
        }
        a{
            button{
                float: right;
                margin-top: 10px;
                margin-right: 10px;
                height: 40px;
                width: 40px;
                border-radius: 20px;
                transition: .3s;
                cursor: pointer;
                :hover{
                    background: gray;
                }
            }
        }
    }
    
`