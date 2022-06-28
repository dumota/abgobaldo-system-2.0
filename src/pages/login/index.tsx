import Link from "next/link";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { Button, Container, Form, FormContainer, Input, Label, Titulo } from "./style";


export default function Login(){

    const refForm = useRef<any>();

    const {logar} = useContext(AutenticacaoContext);
   
   

    const submitForm = useCallback((e: FormEvent)=>{
        e.preventDefault();
       
        if (refForm.current.checkValidity()) {
            
            let obj: any = new Object;
            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;
    
                if (id === "botao")break; 
                obj[id] = value;    
                
             
               
            }

            logar(obj);
            console.log(obj);
            

        }else{
            refForm.current.classList.add('was-validated')
        }   
          

    },[]);


    return(
        <>
            <Container>
                <FormContainer>
                    <Titulo>Bem vindo</Titulo>
                    <Form noValidate ref={refForm}>
                        <Label htmlFor="email">Email</Label>
                        <Input type={'email'} placeholder={'Digite seu Email'} id={'email'} required />
                        <div className="invalid-feedback">
                            Por favor digite seu email.
                        </div>

                        <Label htmlFor="senha">Senha</Label>
                        <Input type={'password'} placeholder={'Digite sua senha'} id={'password'} required />
                        <div className="invalid-feedback">
                            Por favor digite sua senha.
                        </div>

                        <Button type="submit" onClick={(e)=> submitForm(e)} id="botao">Salvar</Button>
                    </Form>
                </FormContainer>
            </Container>
        </>
    )
}