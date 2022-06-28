
import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/request";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

interface interfUsuario {
    bairro: string,
    cpf: string,
    email: string,
    endereco: string,
    id: number,
    nome: string,
    numero?: string,
    telefone: string,

}
interface InterfaceClientsContext {
    setClientSolo: Function,
    clientSolo: Array<interfUsuario>,
    setShowModal: Function,
    showModal: boolean
    dados: any;

}




export const ClientsContext = createContext({} as InterfaceClientsContext);

interface InterProviderProps {
    children: ReactNode;
}
export function ClientProvider({ children }: InterProviderProps) {

    const [clientSolo, setClientSolo] = useState([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function dados($token: string, $id: number) {

        setShowModal(true);
       
        try {
     
            await api.get('/clients/' + $id, {
                headers: {
                    'Authorization': 'Bearer ' + $token
                }
            
            }).then((res) => {
                setClientSolo(res.data)
                console.log(clientSolo);
             

            })
        } catch (error) {
            console.log(error);
            
        }




    }






    return (
        <ClientsContext.Provider value={{ setClientSolo, setShowModal, dados, showModal, clientSolo }}>
            {children}
        </ClientsContext.Provider>
    )

}


