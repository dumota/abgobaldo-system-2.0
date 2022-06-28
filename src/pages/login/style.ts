import styled from "styled-components";

export const Container = styled.div`
    background: url('assets/es.jpg') ;
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .invalid-feedback{
        font-size: 15px;
        letter-spacing: 0;
    }
`

export const FormContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    width: 30vw;
    background: rgba(205,250,400,0.50);
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    backdrop-filter: blur(1.5px);
    border-radius: 10px;
    color:#ffff ;
    text-transform: uppercase;
    letter-spacing:1rem;
`

export const Form = styled.form`
    width: 90%;
    margin: 0;
    padding: 0;
    text-align: center;
`

export const Label = styled.label`
    letter-spacing: 0.5rem;
    font-size: 15px;
    margin-top: auto;
    color: black;
`

export const Input = styled.input`
    margin: auto;
    background: white;
    color: black;
   
    margin-bottom: 15px;
    margin-top: 10px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 9vh;
    width: 100%;
    border-radius: 20px;
    text-align: center;
    
    color: black;
    font-size: 1rem;
    font-weight: bold;
    &:focus{
            
            box-shadow: 0 0 0 0.2rem #b9abe0;
            backdrop-filter: blur(12rem);
            background: rgba(155,255,255,0.15);
    }
`

export const Button = styled.button`
    margin: auto;
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
    transition: 1.5s;
    &:hover{
        background: linear-gradient(to left, #14163c 0%, #03217b 100%);
    }
`

export const Titulo = styled.h1`
    text-align: center;
    justify-content: center;
    font-size: 25px;
    flex-direction: column;
    position: initial;
    padding-bottom: 50%;
`


