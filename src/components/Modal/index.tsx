import { FiX } from 'react-icons/fi'
import './modal.css'

export default function Modal({conteudo, close}: any) {
    return(
        <div className='modal'>
            <div className="container">
                <button className='close' onClick={close}>
                    <FiX size={23} color="#FFF"/>
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do Chamado</h2>

                    <div className="row">
                        <span>
                            Cliente: <a>{conteudo.cliente}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Assunto: <a>{conteudo.assunto}</a>
                        </span>
                        <span>
                            Cadastrado em: <a>{conteudo.created}</a>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: <a style={{ color: '#FFF', backgroundColor: '#f4dd10F' }}>{conteudo.status}</a>
                        </span>
                    </div>

                    {conteudo.complemento !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}