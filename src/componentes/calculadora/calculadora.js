import React from "react";
import "../../css/calculadora/calculadora.css";
import BotonCalculadora from "./botonCalculadora.js";
import PantallaCalculadora from "./pantallaCalculadora.js";
import { useState } from "react";
import { evaluate } from "mathjs";

function Calculadora(props) {
  //hooks de la calculadora
  const [pantallaDatos, setPantallaDatos] = useState("");
  const [datos, setDatos] = useState("");
  const [operacion, setOperacion] = useState("");
  const [mostrarCalculadora, setMostrarCalculadora] = useState(false);

  //esta es una variable de control para limpiar la pantalla
  //una vez sola cada vez que se pulsa para añadir una operacion
  //nueva a una ristra de operaicones
  const [unaVez, setUnaVez] = useState(true);

  //funciones de la calculadora
  const manejarInputNumeroCalculadora = (numero) => {
    if ((operacion === "" || unaVez) && pantallaDatos.length <= 21) {
      if(numero === "."){
        if (!(pantallaDatos.includes("."))) {
          setPantallaDatos(prevPantallaDatos => prevPantallaDatos + numero);
        }
      }else{
        setPantallaDatos(prevPantallaDatos => prevPantallaDatos + numero);
      }
    }else if(pantallaDatos.length <= 21){
      setPantallaDatos(numero);
      setUnaVez(true);
    }
  };

  const manejarInputOperacionCalculadora = (operacionNueva) => {
    if(operacion === ""){
      setDatos(pantallaDatos);
      setPantallaDatos("");
      setOperacion(operacionNueva);
    }else{
      setDatos(prevDatos =>{
        prevDatos = prevDatos+operacion+pantallaDatos;
        const resultado = evaluate(prevDatos);
        setPantallaDatos(resultado);
        return(resultado);
      });
      setOperacion(operacionNueva);
      setUnaVez(false);
    }
  };

  const manejarClear = () => {
    setDatos("");
    setPantallaDatos("");
    setOperacion("");
    setUnaVez(true);
  };

  const manejarResolver = () => {
    //hacemos la operacion aqui en lugar de dentro del
    //setPantallaDatos por seguridad de que esten los datos actualizados
    const resultado = evaluate(datos+operacion+pantallaDatos);
    setPantallaDatos(resultado);
    // Limpiamos los datos para la siguiente operación
    setDatos("");
    setOperacion("");
    setUnaVez(true);
  };

  return(
    <div className="contenedorCalculadora">
      <button className="boton botonCalculadora"
        onClick={() => setMostrarCalculadora(!mostrarCalculadora)}>
        Calculadora
      </button>
      {mostrarCalculadora && <div className="calculadora">
        <PantallaCalculadora datos={pantallaDatos} />
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>7</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>8</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>9</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputOperacionCalculadora}>/</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>4</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>5</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>6</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputOperacionCalculadora}>*</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>1</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>2</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>3</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputOperacionCalculadora}>-</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>0</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputNumeroCalculadora}>.</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarClear}>Clear</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarInputOperacionCalculadora}>+</BotonCalculadora>
        <BotonCalculadora manejarClic={manejarResolver}>=</BotonCalculadora>
      </div>}
    </div>
  );
}

export default Calculadora;