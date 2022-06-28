import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { setCookie } from 'nookies'
import api from "../services/request";

interface InterDados {
    email: string;
    senha: string;
}
interface InterAutenticacaoContext {
    logar(dados: InterDados): Promise<void>;
    setLoading :Function ;
    loading: boolean;
}

export const AutenticacaoContext = createContext(
    {} as InterAutenticacaoContext
);

interface InterProviderProps {
    children: ReactNode;
}
export function AutenticacaoProvider(
    { children }: InterProviderProps
) {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

 

    async function logar(dados: InterDados) {
        try {
            setLoading(true)
            let resultado = await api.post('/login', dados)

            // Localstorage
            // sessionStorage
            // Cookies

            setCookie(
                undefined,
                'access_token',
                resultado.data.access_token
            )

            router.push('/dashboard');
            console.log(resultado.data);
            

            setLoading(false);
        } catch (error) {

        }
    }

    return (
        <AutenticacaoContext.Provider value={{ logar , loading, setLoading }}>
            {children}
        </AutenticacaoContext.Provider>
    )

}