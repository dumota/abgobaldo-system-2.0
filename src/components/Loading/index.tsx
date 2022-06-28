import { useContext } from "react";
import { AutenticacaoContext } from "../../contexts/AutenticacaoContext";
import { LoadingStyle } from "./styles";

export function Loading() {
    const {loading} = useContext(AutenticacaoContext);
    return(
        loading ?
        <LoadingStyle/>
        : <></>
   
    );

}