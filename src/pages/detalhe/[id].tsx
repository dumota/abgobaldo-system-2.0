import { useEffect, useRef, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { parseCookies } from 'nookies';

import { GetServerSideProps } from 'next';
import api from '../../services/request';

import { useRouter } from "next/router";
import { Card, Container } from "./style";

interface interfProps {
    token?: string;
}

interface interfUsuario {
    id: number,
    bairro?: string,
    cpf?: string,
    email: string,
    endereco?: string,
    cidade?: string,
    estado?: string,
    nome: string,
    numero?: string,
    telefone: string,

}

export default function Detalhe(props: interfProps) {
    const [estaEditando, setEstaEditando] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query;
    const [infoCliente, setInfoCliente] = useState<Array<interfUsuario>>([]);
    const firstRenderRef = useRef(true);
    var obj = new Object;

    useEffect(() => {
        api.get('/clients/' + id, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then((res) => {

            setInfoCliente(res.data)




        })




    }, [])







    return (
        <>
            <Dashboard>
              
                <Container>
                    <Card className="card">
                        <div className="card-body">
                        <h1>Cliente- {infoCliente.nome} </h1>
                            <h5 className="card-title">Info sobre {infoCliente.nome}</h5>
                            <p>Email: {infoCliente.email}</p>
                            <p>Telefone: {infoCliente.telefone}</p>
                            <p>CPF: {infoCliente.cpf}</p>
                            <p>Cidade: {infoCliente.cidade}</p>
                            <p>Estado: {infoCliente.estado}</p>
                            <p>Endereço: {infoCliente.endereco}</p>
                            <p>Bairro: {infoCliente.bairro}</p>
                            <p>Numero: {infoCliente.numero}</p>
                        </div>
                    </Card>
                </Container>

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



        return {
            props: {
                token
            }
        }
    }