import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { MdAccessibleForward, MdListAlt, MdAttribution } from 'react-icons/md';

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
        <h3>Escolha sua ficha:</h3>
      </header>
      <main>
          {mock.map(item => <Button {...item} key={item.id} onClick={() => generateToken(item)} />)}
      </main>
      {modalConfirmVisible && (
        <div className='modal' >
          <div className='modalContent'>
            <h1>Confirmar escolha de ficha <u>{optionSelected.name}</u> ?</h1>
            <div className='btnsModal'>
              <button onClick={confirmGenerateToken}>Sim</button>
              <button onClick={() => setModalConfirmVisible(false)}>Não</button>
            </div>
          </div> 
        </div>     
      )}
      {modalPreviewVisible && (
        <div className='modalPreviewContent'>
          {isLoading ? 
            <>
              <h1>Gerando ficha...</h1>
              <div className="spinner-container">
                <div className="loading-spinner">
                </div>
              </div> 
            </> 
                :
            <> 
              <h1>Ficha gerada com sucesso!</h1>
              <p>{data.senha}</p>
            </>
          }
          <button onClick={() => setModalPreviewVisible(false)}>ok</button>
        </div> 
      )}
    </div>
  );
};

export default App;
