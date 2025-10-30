import React from "react";
import "../../css/fondo/botonesColoresFondo.css";

function BotonesColores({ cambiarColorFijo }) {
  return(
    <div className="contenedorBotonesColores">
      <div className="colores">Colores</div>
      <button className="boton botonColores" onClick={() => cambiarColorFijo("red")}>Rojo</button>
      <button className="boton botonColores" onClick={() => cambiarColorFijo("blue")}>Azul</button>
      <button className="boton botonColores" onClick={() => cambiarColorFijo("purple")}>Morado</button>
      <button className="boton botonColores" onClick={() => cambiarColorFijo("green")}>Verde</button>
      <button className="boton botonColores" onClick={() => cambiarColorFijo("")}>Cambiantes</button>
    </div>
  );
}

export default BotonesColores;