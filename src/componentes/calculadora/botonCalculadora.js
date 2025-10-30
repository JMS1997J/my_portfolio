import React from "react";
import "../../css/calculadora/botonCalculadora.css";

function BotonCalculadora(props) {

  return(
    <button
      className={`botonCalculadoraComponente ${props.children == "=" ? "igual" : ""}`}
      onClick={() => props.manejarClic(props.children)}>{props.children}
    </button>
  );
}

export default BotonCalculadora;