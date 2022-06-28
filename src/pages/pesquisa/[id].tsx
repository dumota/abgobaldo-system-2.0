import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { json } from "stream/consumers";
import Dashboard from "../../components/Dashboard";
import api from "../../services/request";


interface interfProps {
    token?: string;
}

export default function Pesquisa(props: interfProps) {

    const [estaEditando, setEstaEditando] = useState<boolean>(false);
    const refForm = useRef<any>();
    const router = useRouter();
    const { id } = router.query;



    // USEEFFECT PARA VER SE ESTA EDITANDO OU NAO
    useEffect(() => {

        const idParam = Number(id);

        if (Number.isInteger(idParam)) {


            api.get('/pesquisas/' + idParam, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            }).then((res) => {
                if (res.data) {

                    setEstaEditando(true);

                    // refForm.current['nome'].value = res.data.nome
                    // refForm.current['email'].value = res.data.email
                    // refForm.current['telefone'].value = res.data.telefone
                    // refForm.current['cpf'].value = res.data.cpf || ''
                    // refForm.current['cidade'].value = res.data.cidade || ''
                    // refForm.current['estado'].value = res.data.estado || ''
                    // refForm.current['endereco'].value = res.data.endereco || ''
                    // refForm.current['bairro'].value = res.data.bairro || ''
                    // refForm.current['numero'].value = res.data.numero || ''

                }
            }).catch((erro) => {
                console.log(erro)
            })
        }

    }, [])

    const submitForm = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (refForm.current.checkValidity()) {

            let obj: any = new Object;

            for (let index = 0; index < refForm.current.length; index++) {
                const id = refForm.current[index]?.id;
                const value = refForm.current[index]?.value;

                if (id === 'botao') break;

                obj[id] = value;




            }




            // api.post('/clients', obj, {
            //     headers: {
            //         'Authorization': 'Bearer ' + props.token
            //     }
            // })
            //     .then((res) => {

            //         router.push('/cliente')

            //     }).catch((err) => {
            //         console.log(err)
            //     })
            console.log(obj);




        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [])

    return (
        <Dashboard>
            <h1>Pesquisa - {!estaEditando ? 'Adicionar' : 'Editar'} </h1>
            <form className='row g-3 needs-validation' noValidate ref={refForm} id="form">

                {/* TITULO */}
                <div className='col-md-6'>
                    <label htmlFor='titulo' className='form-label' >
                        Titulo
                    </label>

                    <input type='text' className='form-control' placeholder='Digite seu nome completo' id="titulo" required />
                    <div className='invalid-feedback'>
                        Por favor digite o titulo .
                    </div>

                </div>

                {/* DESCRIÇÃO */}
                <div className='col-md-6' >
                    <label htmlFor='descricao' className='form-label' >
                        Descrição
                    </label>
                    <input type='text' className='form-control' placeholder='Digite a descrição' id="descricao" required />
                    <div className='invalid-feedback'>
                        Por favor digite sua descrição.
                    </div>

                </div>

                {/* Perguntas */}
                <div className='col-md-6' >


                    <label htmlFor='pergunta_id' className='form-label' >
                        Pergunta 1
                    </label>
                    <input type='text' id="pergunta1" className='form-control' placeholder='Digite sua pergunta' required />


                    <label htmlFor='pergunta_id' className='form-label' >
                        Pergunta 2
                    </label>
                    <input type='text' id="pergunta2" className='form-control' placeholder='Digite sua pergunta' required />


                    <label htmlFor='pergunta_id' className='form-label' >
                        Pergunta 3
                    </label>
                    <input type='text' id="pergunta3" className='form-control' placeholder='Digite sua pergunta' required />

                    <div className='invalid-feedback'>
                        Por favor digite suas perguntas.
                    </div>

                </div>






                {/* BOTÃO DE COISAS */}
                <div
                    className='col-md-12'
                >
                    <button
                        className='btn btn-primary mt-3'
                        type='submit'
                        id='botao'
                        onClick={(e) => {
                            estaEditando ?
                                editForm(e)
                                :
                                submitForm(e)
                        }}
                    >
                        Enviar
                    </button>
                </div>
            </form>
        </Dashboard >
    )
}