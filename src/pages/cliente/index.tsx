import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Dashboard from "../../components/Dashboard";
import api from "../../services/request";
import { validaPermissao } from "../../services/validaPermissao";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import Modal from "../../components/Modal";

interface interfProps {
    token?: string;
}

interface interfUsuario {
    bairro?: string,
    cpf?: string,
    email: string,
    endereco?: string,
    id: number,
    nome: string,
    numero?: string,
    telefone: string,
    
}

export default function Cliente(props: interfProps) {

    const router = useRouter();
    const [clientes, setclientes] = useState<Array<interfUsuario>>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const {setLoading} = useContext(AutenticacaoContext);

    useEffect(() => {

        setLoading(true)
        api.get('/clients', {
            // headers (cabeçalhos)
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then((res) => {


                setclientes(res.data)
                setLoading(false)
            }).catch((erro) => {
                console.log(erro)
            })

    }, [])


    async function deleteUser (element: interfUsuario) {
        const id = element.id ? element.id :null ;
         setLoading(true);
        await api.delete(`/clients/${id}`,{
            headers:{
                Authorization : `Bearer ${props.token}`
            }
        }).then((res)=>{
            console.log(res);
           
           
            
        }).catch((err)=>{
            console.log(err);
            
        })
    
        await api.get('/clients', {
            headers:{
                Authorization : `Bearer ${props.token}`
            }
        }).then((res)=>{
            setclientes(res.data);
            setLoading(false);
            
        })
        
    }

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
                            <h2>Clientes</h2>
                            <div
                                className={"btn-toolbar mb-2 mb-md-0"}
                            >
                                <button
                                    className='btn btn-success'
                                    type="button"
                                    onClick={() => { router.push('/cliente/adicionar') }}
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
                                clientes.map((element, index) => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.id}</td>
                                            <td>{element.nome}</td>
                                            <td>{element.email}</td>
                                            <td>
                                                <button
                                                    className='btn btn-primary'
                                                    onClick={() => {
                                                        // router.push('/usuario/' + element.id)
                                                        router.push(`/cliente/${element.id}`)

                                                    }}
                                                    style={{
                                                        marginRight: 5
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => {
                                                        deleteUser(element);
                                                     }}
                                                >
                                                    Excluir
                                                </button>
                                                <button onClick={()=> setShowModal(true)} className="btn btn-warning">
                                                    Visualizar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </div>
                <Modal show={showModal} onClose={()=> setShowModal(false)}>
                    {
                        clientes.map((client , index)=>{
                            return(
                                <tr key={client.id}>
                                    <td>{client.nome}</td>
                                    <td>{client.email}</td>
                                </tr>
                               
                            )
                        })
                    }
                </Modal>
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