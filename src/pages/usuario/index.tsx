import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import api from '../../services/request';
import { validaPermissao } from '../../services/validaPermissao';


interface interfProps {
    token?: string;
}

interface InterfaceUsuer{
    id:number,
    name: string,
    email: string,
    password: string,
    tipo: string,
    status: number,
}

export default function Usuario(props:interfProps){

    const router = useRouter();
    const [usuarios, setUsuarios] = useState<Array<InterfaceUsuer>>([]);
    const {setLoading} = useContext(AutenticacaoContext);

    useEffect(() => {

        setLoading(true)
        api.get('/user', {
            // headers (cabeçalhos)
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then((res) => {


                setUsuarios(res.data)
                setLoading(false)
            }).catch((erro) => {
                console.log(erro)
            })

    }, [])


 
    return (
        <Dashboard>
            <>
                <Head>
                    <title>Usuario</title>
                </Head>

                <div
                   
               
                >

                    <>
                        <div
                            className={"d-flex justify-content-between " +
                                "flex-wrap flex-md-nowrap align-items-center" +
                                " pt-3 pb-2 mb-3 border-bottom"}
                        >
                            <h2>Usuarios do Sistema</h2>
                            <div
                                className={"btn-toolbar mb-2 mb-md-0"}
                            >
                                <button
                                    className='btn btn-success'
                                    type="button"
                                    onClick={() => { router.push('/usuario/adicionar') }}
                                >Adicionar</button>
                            </div>
                        </div>
                    </>
                    <table
                        className='table table-striped'
                    >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map((element, index) => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.id}</td>
                                            <td>{element.name}</td>
                                            <td>{element.email}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={() => {
                                                        // router.push('/usuario/' + element.id)
                                                        router.push(`/usuario/${element.id}`)

                                                    }}
                                                    style={{
                                                        marginRight: 5
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
            </>
        </Dashboard>
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

        const temPermissaoPage = validaPermissao(
            token, ['admin']
        )

        if (!temPermissaoPage) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return {
            props: {
                token
            }
        }
    }