import React from "react";
import "../css/segmento.css";
import { useState } from "react";

function Segmento(props) {
  const [ampliado, setAmpliado] = useState(false);

  const ampliar = () => {
    setAmpliado(!ampliado);
  };
  
  return(
    <>
      {ampliado && <div className="fondoAmpliado" onClick={ampliar} />}
      <div className={`${ampliado ? "contenedorSegmentoAmpliado" : "contenedorSegmento"}`} onClick={ampliar}>
        <img className="imagenSegmento" src={`/imagenes/${props.imagen}.jpg`}
          alt={`Foto de ${props.imagen}`}
        />
        <div className="contenedorTexto">
          <h1>{ props.titulo }</h1>
          <div>{ props.texto }</div>
        </div>
      </div>
    </>
  );
}

export default Segmento;