import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { MdAccessibleForward, MdListAlt, MdAttribution, MdClose } from 'react-icons/md';
import check from '../src/assets/check.png';
const mock = [
  {
    id: "1",
    name: "Geral",
    type:"SG",
    img: <MdAttribution />,
  },
  {
    id: "2",
    name: "Preferencial",
    type: "SP",
    img: <MdAccessibleForward />,
  },
  {
    id: "3",
    name: 'Exame',
    type: "SE",
    img: <MdListAlt />,
  },
]
  

const App = () => {
  const [data, setData] = useState([]);
  const [optionSelected, setOptionSelected] = useState([]);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalPreviewVisible, setModalPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateToken = (item) =>{
    setOptionSelected(item);
    setModalConfirmVisible(true);
  };

  const confirmGenerateToken = () =>{
    setIsLoading(true);
    fetch(`https://ticketprint.herokuapp.com/senha/${optionSelected.type}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false)
        },
        (error) => {
          console.log(error);
        }
      );
    setModalConfirmVisible(false);
    setModalPreviewVisible(true);
  }

  return (
    <div className='container'>
      <header>
        <h1>Sistema de Atendimento</h1>
        <h2>Clique na opção desejada para retirar sua senha:</h2>
      </header>
      <main>
          {mock.map(item => <Button {...item} key={item.id} onClick={() => generateToken(item)} />)}
      </main>
      {modalConfirmVisible && (
        <div className='modal' >
          <div className='modalContent'>
            <button className="btnExit" onClick={() => setModalConfirmVisible(false)}>
              <MdClose size={30} />
            </button>
            <p>Deseja gerar ficha <u>{optionSelected.name}</u>?</p>
            <div className='btnsModal'>
              <button onClick={confirmGenerateToken}>Sim</button>
              <button onClick={() => setModalConfirmVisible(false)}>Não</button>
            </div>
            {optionSelected.name === "Preferencial" && (
              <span><i>Obs: Ficha destinada a pessoas idosas, gestantes ou deficientes.</i></span>
            )}
          </div> 
        </div>     
      )}
      {modalPreviewVisible && (
        <div className='modal'>
          <div className='modalPreviewContent'>
            {isLoading ? <p>Gerando ficha...</p> : <p>Ficha gerada com sucesso!<img src={check} alt="check" className='img' /></p>}
            {!isLoading && <p><u>{data.senha}</u></p>}
            <button onClick={() => setModalPreviewVisible(false)}>{isLoading ? (
              <div className="spinner-container">
                <div className="loading-spinner">
                </div>
              </div> 
            ): 'ok'}
            </button>
          </div>
        </div>
      )} 
    </div>
  );
};
export default App;
