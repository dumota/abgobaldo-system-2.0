import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Divider, LinkContainer, Logo, Sidebar, SLayout, SLink, SLinkIcon, SLinkLabel, SMain, SSidebarButton, Stheme, SThemeLabel, SThemeTooggler, SToggleThumb } from "./style";
import { AiOutlineHome, AiOutlineLeft, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import { IoPeopleCircle } from 'react-icons/io5';
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { validaPermissao } from "../../services/validaPermissao";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { Router, useRouter } from "next/router";
import { BsSearch, BsPersonPlus } from 'react-icons/bs';

interface InterfaceProps {
    children: ReactNode;
    token?: string;


}


export default function Dashboard(props: InterfaceProps) {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { setTheme, theme } = useContext(ThemeContext);
    const { setLoading } = useContext(AutenticacaoContext);
    const router = useRouter();
    function logout() {
        setLoading(true);
        var coockies = document.cookie.split(";");
        for (let index = 0; index < coockies.length; index++) {
            var cookie = coockies[index];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";


        }

        setLoading(false);
        router.push('/login');

    }

    return (
        <SLayout>
            <Sidebar isOpen={sidebarOpen}>
                <>
                    <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                        <AiOutlineLeft />
                    </SSidebarButton>
                </>

                <Divider />

                <LinkContainer  >
                    <Link href={'/dashboard'} >
                        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon><AiOutlineHome /></SLinkIcon>
                            {
                                sidebarOpen && (
                                    <>
                                        <SLinkLabel>DashBoard</SLinkLabel>
                                    </>
                                )
                            }
                        </SLink>
                    </Link>
                </LinkContainer>



                <LinkContainer  >
                    <Link href={'/cliente'} >
                        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon><IoIosPeople /></SLinkIcon>
                            {
                                sidebarOpen && (
                                    <>
                                        <SLinkLabel>Clientes</SLinkLabel>
                                    </>
                                )
                            }
                        </SLink>
                    </Link>
                </LinkContainer>


                <LinkContainer  >
                    <Link href={'/cliente/criar'} >
                        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon><AiOutlinePlusCircle /></SLinkIcon>
                            {
                                sidebarOpen && (
                                    <>
                                        <SLinkLabel>Add Cliente</SLinkLabel>
                                    </>
                                )
                            }
                        </SLink>
                    </Link>
                </LinkContainer>

                <LinkContainer  >
                    <Link href={'/pesquisa'} >
                        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon> <BsSearch /></SLinkIcon>
                            {
                                sidebarOpen && (
                                    <>
                                        <SLinkLabel>Pesquisas</SLinkLabel>
                                    </>
                                )
                            }
                        </SLink>
                    </Link>
                </LinkContainer>


            
               
                    <LinkContainer  >
                        <Link href={'/usuario/criar'} >
                            <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                                <SLinkIcon><BsPersonPlus /></SLinkIcon>
                                {
                                    sidebarOpen && (
                                        <>
                                            <SLinkLabel>Add Usuario</SLinkLabel>
                                        </>
                                    )
                                }
                            </SLink>
                        </Link>
                    </LinkContainer>
                




                <LinkContainer  >
                    <Link href={'/usuario'} >
                        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon><IoPeopleCircle /></SLinkIcon>
                            {
                                sidebarOpen && (
                                    <>
                                        <SLinkLabel>Usuario</SLinkLabel>
                                    </>
                                )
                            }
                        </SLink>
                    </Link>
                </LinkContainer>


                <Divider />
                {secondLinksArray.map((secondLink) => (
                    <LinkContainer key={secondLink.label}>
                        <div style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon onClick={logout}>{secondLink.icon}</SLinkIcon>
                            {sidebarOpen && <p>{secondLink.label}</p>}
                        </div>
                    </LinkContainer>
                ))}
                <Divider />
                <Stheme>

                    {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                    <SThemeTooggler
                        isActive={theme === "dark"}
                        onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                    >

                        <SToggleThumb style={theme === 'dark' ? { right: "1px" } : {}} />
                    </SThemeTooggler>
                </Stheme>

            </Sidebar>
            <SMain>
                {props.children}
            </SMain>

        </SLayout>




    )
}



const secondLinksArray = [
    {
        label: "Logout",
        icon: <MdLogout />
    }
]



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

        const temPermissaoPage = validaPermissao(token, ['admin']);

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