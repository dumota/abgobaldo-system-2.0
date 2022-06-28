import Dashboard from "../../components/Dashboard";
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';


export default function DashBoard(){
    return(
        <>
            <Dashboard>
                <div>Bem vindo meu querido amigo</div>
            </Dashboard>
        </>
    );
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