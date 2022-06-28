import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Divider, LinkContainer, Logo, Sidebar, SLayout, SLink, SLinkIcon, SLinkLabel, SMain, SSidebarButton, Stheme, SThemeLabel, SThemeTooggler, SToggleThumb } from "./style";
import { AiOutlineHome, AiOutlineLeft } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import { BiSearchAlt } from 'react-icons/bi';
import { IoIosPeople } from 'react-icons/io';
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { validaPermissao } from "../../services/validaPermissao";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { Router, useRouter } from "next/router";

interface InterfaceProps {
    children: ReactNode;
    token?:string;
 
}


export default function Dashboard(props:InterfaceProps) {

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
                <Logo>
                    <img src="/assets/logo.svg" alt="logo" />
                </Logo>
                <Divider />
                {linksArray.map(({ icon, label, to }) => (
                    <LinkContainer key={label} >
                        <Link href={to}>
                            <SLink style={!sidebarOpen ? { width: `fit-content` } : {}}>
                                <SLinkIcon>{icon}</SLinkIcon>
                                {
                                    sidebarOpen && (
                                        <>
                                            <SLinkLabel>{label}</SLinkLabel>
                                        </>
                                    )
                                }
                            </SLink>
                        </Link>


                    </LinkContainer>
                ))}
                <Divider />
                {secondLinksArray.map((secondLink) => (
                    <LinkContainer key={secondLink.label}>
                        <div style={!sidebarOpen ? { width: `fit-content` } : {}}>
                            <SLinkIcon>{secondLink.icon}</SLinkIcon>
                            {sidebarOpen && <button onClick={logout}>{secondLink.label}</button>}
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

const linksArray = [
    {
        label: "Dashboard",
        icon: <AiOutlineHome />,
        to: "/dashboard"
    },
    {
        label: "Clientes",
        icon: <IoIosPeople />,
        to: "/cliente"
    },
    {
        label: "Add cliente",
        icon: <AiOutlineHome />,
        to: "/cliente/criar"
    },
    {
        label: "Usuarios",
        icon: <AiOutlineHome />,
        to: "/usuario"
    },
    {
        label: "add Usuario",
        icon: <AiOutlineHome />,
        to: "/usuario/criar"
    },
    {
        label: "Pesquisas",
        icon: <AiOutlineHome />,
        to: "/pesquisa"
    },

]

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
        return {
            props: {
                token
            }
        }
    }