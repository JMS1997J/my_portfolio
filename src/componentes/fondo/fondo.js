import React from "react";
import { useState, useEffect, useRef } from "react";
import "../../css/fondo/fondo.css";

//para recibir un valor entre un minimo y un maximo incluyendo esos numeros
//Math.floor(Math.random() * (max - min + 1) ) + min;



function Fondo({ colorInicial, duracionTransicionInicial, duracionDelayInicial, colorFijo }) {

  //hooks para controlar el color, la duracion de la transicion y el delay
  const [color, setColor] = useState(colorInicial);
  const [duracionTransicion, setDuracionTransicion] = useState(duracionTransicionInicial);
  const [duracionDelay, setDuracionDelay] = useState(duracionDelayInicial);

  //aqui defino las propiedades css que van a ir cambiando, por eso no lo hago en un css a parte
  const estiloFondo = {
    backgroundColor: color,
    transitionProperty: "background-color, duration, delay",
    transitionDuration: duracionTransicion,
    transitionDelay: duracionDelay
  };

  

  //esto ira cambiando en bucle el color y sus duraciones si no esta en color fijo
  useEffect(() => {
    let interval;
    if (colorFijo != "") {
      setDuracionTransicion("0.5s");
      setDuracionDelay("0.5s");
      setColor(colorFijo);
    }else{
      interval = setInterval(() => {
        setDuracionTransicion((Math.floor(Math.random() * (10 - 5 + 1) ) + 5) + "s");
        setDuracionDelay((Math.floor(Math.random() * (10 - 5 + 1) ) + 5) + "s");
        let nuevoColor = ["red", "blue", "purple", "green"];
        setColor(nuevoColor[(Math.floor(Math.random() * (3 - 0 + 1) ) + 0)]);
      }, (parseFloat(duracionTransicion) * 1000) + (parseFloat(duracionDelay) * 1000));
    }
    return () => clearInterval(interval);
  }, [colorFijo, color]);

  return(
    <div className="fondo" style={estiloFondo} />
  );
}

export default Fondo;