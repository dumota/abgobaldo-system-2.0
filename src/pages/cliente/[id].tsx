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


            api.get('/clients/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                if (res.data) {

                    setEstaEditando(true);

                    refForm.current['nome'].value = res.data.nome
                    refForm.current['email'].value = res.data.email
                    refForm.current['telefone'].value = res.data.telefone
                    refForm.current['cpf'].value = res.data.cpf || ''
                    refForm.current['cidade'].value = res.data.cidade || ''
                    refForm.current['estado'].value = res.data.estado || ''
                    refForm.current['endereco'].value = res.data.endereco || ''
                    refForm.current['bairro'].value = res.data.bairro || ''
                    refForm.current['numero'].value = res.data.numero || ''

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

            api.post('/clients', obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            })
                .then((res) => {

                    router.push('/cliente')

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


            api.put('/clients/'+id, obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                router.push('/cliente')
            })



        }  else {
            refForm.current.classList.add('was-validated')
        }
    }, [])


    return (
        <>
            <Dashboard>
                <h1>Cliente - {!estaEditando ? 'Adicionar' : 'Editar'} </h1>
                <form className='row g-3 needs-validation' noValidate ref={refForm} >

                    {/* NOME */}
                    <div className='col-md-6'>
                        <label
                            htmlFor='nome'
                            className='form-label'
                        >
                            Nome
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu nome completo'
                            id="nome"
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

                    {/* TELEFONE */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='telefone'
                            className='form-label'
                        >
                            Telefone
                        </label>

                        <input
                            type='tel'
                            className='form-control'
                            placeholder='Digite seu telefone'
                            id="telefone"
                            required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu telefone.
                        </div>

                    </div>

                    {/* CPF */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='cpf'
                            className='form-label'
                        >
                            CPF
                        </label>

                        <input
                            type='number'
                            className='form-control'
                            placeholder='Digite seu cpf'
                            id="cpf"
                        // required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu cpf.
                        </div>

                    </div>


                    {/* CIDADE */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='cidade'
                            className='form-label'
                        >
                            Cidade
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite sua cidade'
                            id="cidade"
                        // required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite sua cidade.
                        </div>

                    </div>

                    {/* ESTADO */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='estado'
                            className='form-label'
                        >
                            Estado
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu Estado'
                            id="estado"
                        // required
                        />
                        <div className='invalid-feedback'>
                            Por favor digite seu Estado.
                        </div>

                    </div>


                    {/* ENDEREÇO */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='endereco'
                            className='form-label'
                        >
                            Endereço
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu endereço'
                            id="endereco"
                        // required
                        />
                    </div>

                    {/* BAIRRO */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='bairro'
                            className='form-label'
                        >
                            Bairro
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu bairro'
                            id="bairro"
                        // required
                        />
                    </div>

                    {/* NUMERO */}
                    <div
                        className='col-md-6'
                    >
                        <label
                            htmlFor='numero'
                            className='form-label'
                        >
                            Numero
                        </label>

                        <input
                            type='text'
                            className='form-control'
                            placeholder='Digite seu numero'
                            id="numero"
                        // required
                        />
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