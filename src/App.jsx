import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Preferencial from "./assets/cadeirante.png";

const App = () => {
  const [data, setData] = useState(false);

  // useEffect(() => {
  //   fetch("https://ticketprint.herokuapp.com/senha/SG")
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setData(result);
  //       },
  //       (error) => {
  //         console.warn("Deu erro");
  //       }
  //     );
  // }, []);
  return (
    <div class="container">
      <div class="header">
        <p>Sistema de Atendimento</p>
      </div>
      <div class="btn1">
        <Button type={"Geral"} color={"rgba(0, 0, 255, 0.6)"} />
      </div>
      <div class="btn2">
        <Button
          type={"Preferencial"}
          color={"rgba(0, 0, 255, 0.7)"}
          img={Preferencial}
        />
      </div>
      <div class="btn3">
        <Button type={"Exame"} color={"rgba(0, 0, 255, 0.8)"} />
      </div>
      <div class="footer">
        <div></div>
      </div>
    </div>
  );
};

export default App;
