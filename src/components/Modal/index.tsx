import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalView } from "./style";
import {AiOutlineClose} from 'react-icons/ai'

interface InterfacePropsModal {
    children: ReactNode;
    show: boolean;
    onClose: () => void;
}


export default function Modal({ show, onClose, children }: InterfacePropsModal) {
    const
        [isBrowser, setIsBrowser] = useState<boolean>(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (e: Event) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <ModalView>
            <div>
                <a href="#" onClick={handleClose}>
                    <button><AiOutlineClose/></button>
                </a>
                <div>{children}</div>
            </div>

        </ModalView>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }


}