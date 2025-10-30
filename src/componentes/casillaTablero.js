import React from "react";
import "../css/casillaTablero.css";

function CasillaTablero({ casilla, manejarClic }) {
  return(
    <div>
      <img
        data-casilla={JSON.stringify(casilla)}
        className={`${casilla.activo ? "casillaTableroActivo" : "casillaTablero"}`}
        src={`/imagenes/puzzle/${casilla.id}.jpg`}
        alt={`Fragmento de imagen en posición ${casilla.id}`}
        onClick={(manejarClic)}
      />
    </div>
  );
}

export default CasillaTablero;