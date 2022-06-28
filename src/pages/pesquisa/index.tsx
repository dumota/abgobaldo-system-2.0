import Dashboard from "../../components/Dashboard";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import api from "../../services/request";

interface InterfacePesquisa{
    id: number,
    titulo: string,
    descricao: string,
    perguntas_id: Array<string>;
}

interface interfProps {
    token?: string;
}


export default function Pesquisa(props:interfProps){
    
    const router = useRouter();
    const [pesquisas, setPesquisas] = useState<Array<InterfacePesquisa>>([]);
    const {setLoading} = useContext(AutenticacaoContext);

    useEffect(() => {

        setLoading(true)
        api.get('/pesquisas', {
           
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then((res) => {


                // setclientes(res.data)
                setPesquisas(res.data);
                
                
                setLoading(false)
            }).catch((erro) => {
                console.log(erro)
            })

    }, [])

  

    return(
        <>
            <Dashboard>
            <div
                   
               
                   >
   
                       <>
                           <div
                               className={"d-flex justify-content-between " +
                                   "flex-wrap flex-md-nowrap align-items-center" +
                                   " pt-3 pb-2 mb-3 border-bottom"}
                           >
                               <h2>Pesquisas</h2>
                               <div
                                   className={"btn-toolbar mb-2 mb-md-0"}
                               >
                                   <button
                                       className='btn btn-success'
                                       type="button"
                                       onClick={() => { router.push('/pesquisa/adicionar') }}
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
                                   <th>Titulo</th>
                                   <th>Descrição</th>
                                   <th>Ações</th>
                               </tr>
                           </thead>
                           <tbody>
                               {
                                   pesquisas.map((pesquisa, index) => {
                                       return (
                                           <tr key={pesquisa.id}>
                                               <td>{pesquisa.id}</td>
                                               <td>{pesquisa.titulo}</td>
                                               <td>{pesquisa.descricao}</td>
                                               <td>
                                                   <button
                                                       className='btn btn-primary'
                                                       onClick={() => {
                                                           // router.push('/usuario/' + element.id)
                                                           router.push(`/pesquisa/${pesquisa.id}`)
   
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