import './App.css';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineCopy } from 'react-icons/ai';
import { useState } from 'react';
import api from './services/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  function aviso() {
    toast(
      "Copiado!",
      {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 500,
        theme: "dark",
        hideProgressBar: true,
      }
    );
  }
  async function hs() {
    if (input === '') {
      alert("Preencha o CEP.");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      /*console.log(response);*/
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops.. ocorreu um erro.")
      setInput("");
    }
  }

  return (
    <>
      <div className="App">
        <h2 className="title">Consulta CEP</h2>

        <div className="containerInput">
          <input type="text" placeholder="Digite o CEP" value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button className="find" onClick={hs}>
            <FiSearch size={25} color="#FFF" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>

            <h2>{cep.cep}</h2>
            <div className='logradouro'>
              <span>RUA: {cep.logradouro}</span>
              <button className='bCopy' onClick={aviso}>
                <CopyToClipboard text={cep.logradouro}>
                  <AiOutlineCopy className='cb' size={16}></AiOutlineCopy>
                </CopyToClipboard>
                <ToastContainer />
              </button>
            </div>

            <div className='bairro'>
              <span>BAIRRO: {cep.bairro}</span>
              <button className='bCopy' onClick={aviso}>
                <CopyToClipboard text={cep.bairro}>
                  <AiOutlineCopy className='cb' size={16}></AiOutlineCopy>
                </CopyToClipboard>
                <ToastContainer />
              </button>

            </div>

            <div className='localidade'>
              <span>CIDADE: {cep.localidade}</span>
              <button className='bCopy' onClick={aviso}>
                <CopyToClipboard text={cep.localidade}>
                  <AiOutlineCopy className='cb' size={16}></AiOutlineCopy>
                </CopyToClipboard>
                <ToastContainer />
              </button>
            </div>

            <div className='uf'>
              <span>UF: {cep.uf}</span>
              <button className='bCopy' onClick={aviso}>
                <CopyToClipboard text={cep.uf}>
                  <AiOutlineCopy className='cb' size={16}></AiOutlineCopy>
                </CopyToClipboard>
                <ToastContainer />
              </button>
            </div>
          </main>
        )}

      </div>
    </>

  );
}

export default App;
