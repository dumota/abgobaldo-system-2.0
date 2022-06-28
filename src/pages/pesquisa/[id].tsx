import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

import Dashboard from "../../components/Dashboard";
import api from "../../services/request";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';


interface interfProps {
    token?: string;
}

export default function Pesquisa(props: interfProps) {

    const [estaEditando, setEstaEditando] = useState<boolean>(false);
    const refForm = useRef<any>();
    const router = useRouter();
    const { id } = router.query;



    // USEEFFECT PARA VER SE ESTA EDITANDO OU NAO
    useEffect(() => {

        const idParam = Number(id);

        if (Number.isInteger(idParam)) {


            api.get('/perguntas/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                // if (res.data) {

                //     setEstaEditando(true);

                //     refForm.current['titulo'].value = res.data.titulo
                //     refForm.current['descricao'].value = res.data.descricao
                //     refForm.current['pergunta1'].value = res.data.pergunta1
                //     refForm.current['pergunta2'].value = res.data.pergunta1
                //     refForm.current['pergunta3'].value = res.data.pergunta1




                // }
                console.log(res.data);

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
            console.log(obj);
            




            api.post('/pesquisas', obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            })
                .then((res) => {

                    router.push('/pesquisa')

                }).catch((err) => {
                    console.log(err)
                })
            console.log(obj);




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


            api.put('/pesquisas/' + id, obj, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                router.push('/pesquisa')
            })



        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])


    return (
        <Dashboard>
            <h1>Pesquisa - {!estaEditando ? 'Adicionar' : 'Editar'} </h1>
            <form className='row g-3 needs-validation' noValidate ref={refForm} id="form">

                {/* TITULO */}
                <div className='col-md-6'>
                    <label htmlFor='titulo' className='form-label' >
                        Titulo
                    </label>

                    <input type='text' className='form-control' placeholder='Digite seu nome completo' id="titulo" required />
                    <div className='invalid-feedback'>
                        Por favor digite o titulo .
                    </div>

                </div>

                {/* DESCRIÇÃO */}
                <div className='col-md-6' >
                    <label htmlFor='descricao' className='form-label' >
                        Descrição
                    </label>
                    <input type='text' className='form-control' placeholder='Digite a descrição' id="descricao" required />
                    <div className='invalid-feedback'>
                        Por favor digite sua descrição.
                    </div>

                </div>

                {/* Perguntas */}
                <div className='col-md-12' >


                    <label htmlFor='pergunta1' className='form-label' >
                        Pergunta 1
                    </label>
                    <input type='text' id="pergunta1" className='form-control' placeholder='Digite sua pergunta' required />


                    <label htmlFor='pergunta2' className='form-label' >
                        Pergunta 2
                    </label>
                    <input type='text' id="pergunta2" className='form-control' placeholder='Digite sua pergunta' required />


                    <label htmlFor='pergunta3' className='form-label' >
                        Pergunta 3
                    </label>
                    <input type='text' id="pergunta3" className='form-control' placeholder='Digite sua pergunta' required />

                    <label htmlFor='pergunta4' className='form-label' >
                        Pergunta 4
                    </label>
                    <input type='text' id="pergunta4" className='form-control' placeholder='Digite sua pergunta' required />

                    <label htmlFor='pergunta5' className='form-label' >
                        Pergunta 5
                    </label>
                    <input type='text' id="pergunta5" className='form-control' placeholder='Digite sua pergunta' required />



                    <div className='invalid-feedback'>
                        Por favor digite suas perguntas.
                    </div>

                </div>


                {/* TIPO DA PERGUNTA */}
                <div className='col-md-6'>
                    <label
                        htmlFor='tipo'
                        className='form-label'
                    >
                        Tipo
                    </label>
                    <select className='form-select' name="tipo" id="tipo" defaultValue={""}>
                        <option value="">Selecione o tipo</option>
                        <option value="discurssiva">discurssiva</option>
                        
                    </select>
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
        </Dashboard >
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