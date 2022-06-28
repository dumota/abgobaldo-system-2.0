import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { parseCookies } from 'nookies';

import { GetServerSideProps } from 'next';
import api from '../../services/request';
import { validaPermissao } from "../../services/validaPermissao";
import { useRouter } from "next/router";

interface interfProps {
    token?: string;
}

export default function Cliente(props: interfProps) {
    const [estaEditando, setEstaEditando] = useState<boolean>(false);
    const refForm = useRef<any>();
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {

        const idParam = Number(id);

        if (Number.isInteger(idParam)) {


            api.get('/user/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                if (res.data) {

                    setEstaEditando(true);

                    refForm.current['name'].value = res.data.name
                    refForm.current['email'].value = res.data.email
                    refForm.current['password'].value = res.data.password
                    refForm.current['tipo'].value = res.data.tipo
                    refForm.current['status'].value = res.data.status

                }
            }).catch((erro) => {
                console.log(erro)
            })
        }

    }, [])


    const submitForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {

            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === 'botao') break;
                obj[id] = value;

            }
           
            
            api.post('/registro', obj)
                .then((res) => {

                    router.push('/usuario')

                }).catch((err) => {
                    console.log(err)
                })



        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [])

    const editForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {
            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index].id;
                const value = refForm.current[index].value;

                if (id === 'botao') break;
                obj[id] = value;


            }
        
            console.log(obj);
            
            api.post('/user/'+id, obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                router.push('/usuario')
            })



        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])


    return (
        <>
            <Dashboard>
                <h1>Usuario - {!estaEditando ? 'Adicionar' : 'Editar'} </h1>
                <form className='row g-3 needs-validation' noValidate ref={refForm} >

                    {/* NOME */}
                    <div className='col-md-6'>
                        <label
                            htmlFor='name'
                            className='form-label'
                        >
                            Nome
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu nome completo'
                            id="name"
                            required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu nome completo.
                        </div>

                    </div>

                    {/* EMAIL */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='email'
                            className='form-label'
                        >
                            Email
                        </label>
                        <div
                            className='input-group has-validation'
                        >
                            <span
                                className='input-group-text'
                            >@</span>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Digite o email'
                                id="email"
                                required
                            />
                            <div className='invalid-feedback'>
                                Por favor digite seu email.
                            </div>
                        </div>
                    </div>

                    {/* SENHA */}
                    <div
                        className='col-md-12'
                    >
                        <label
                            htmlFor='password'
                            className='form-label'
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className='form-control'
                            placeholder='Digite sua senha'
                            id="password"
                            required={!estaEditando}
                        />
                        <div
                            className='invalid-feedback'
                        >
                            Por favor digite sua senha.
                        </div>
                    </div>

                    {/* TIPO */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='tipo'
                            className='form-label'
                        >
                            Tipo
                        </label>

                        <select
                            required
                            className='form-select'
                            defaultValue={""}
                            id='tipo'
                        >
                            <option value=''>Selecione o tipo</option>
                            <option value='admin'>Admin</option>
                            <option value='colaborador'>Colaborador</option>
                        </select>
                        <div className='invalid-feedback'>
                            Por favor selecione o tipo.
                        </div>
                    </div>    
                    
                    {/* STATUS */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='status'
                            className='form-label'
                        >
                            Status
                        </label>

                        <select
                            required
                            className='form-select'
                            defaultValue={""}
                            id='status'
                        >
                            <option value=''>Selecione o tipo</option>
                            <option value='1'>Ativo</option>
                            <option value='0'>Inativo</option>
                        </select>
                        <div className='invalid-feedback'>
                            Por favor selecione o status.
                        </div>
                    </div>  



                    {/* BOTÃO DE COISAS */}
                    <div
                        className='col-md-12'
                    >
                        <button
                            className='btn btn-primary mt-3'
                            type='submit'
                            id='botao'
                            onClick={(e) => {
                                estaEditando ?
                                    editForm(e)
                                    :
                                    submitForm(e)
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                </form>

            </Dashboard>
        </>
    )
}


export const getServerSideProps:
    GetServerSideProps = async (contexto) => {
        const { 'access_token': token } = parseCookies(contexto);

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }

        // const temPermissaoPage = validaPermissao(
        //     token, ['admin']
        // )

        // if (!temPermissaoPage) {
        //     return {
        //         redirect: {
        //             destination: '/dashboard',
        //             permanent: false
        //         }
        //     }
        // }

        return {
            props: {
                token
            }
        }
    }