import React from "react";
import CasillaTablero from "../componentes/casillaTablero.js";
import "../css/puzzle.css";
import { useState, useEffect } from "react";

function Puzzle(props) {
  const [inicio, setInicio] = useState(false);
  const [textoInicio, setTextoInicio] = useState("Iniciar");
  const [tablero, setTablero] = useState([]);
  const [casillaGuardada, setCasillaGuardada] = useState("");
  const [imagenReferenciaVisible, setImagenReferenciaVisible] = useState("block");
  const [timer, setTimer] = useState([0,0,0]);
  const [textoCompletado, setTextoCompletado] = useState("");

  useEffect(() => {
    let interval;
    if(inicio){
      interval = setInterval(() => {
        setTimer((prevTimer =>{
          //con esto creamos una nueva copia del array que hay guardado
          let nuevoTimer = [...prevTimer];
          if (nuevoTimer[2] !== 59) {//comprobamos si los segundos son 59
            //si no es 59 sumamos 1 y devolvemos el array
            nuevoTimer[2]++;
            return nuevoTimer;
          }else{
            //si los segundos son 59 lo ponemos a 0 y cambiamos los minutos
            nuevoTimer[2] = 0;
            if(nuevoTimer[1] !== 59){//comprobamos si los minutos son 59
              //si no es 59 sumamos 1 y devolvemos el array
              nuevoTimer[1]++;
              return nuevoTimer;
            }else{
              //si los minutos son 59 lo ponemos a 0 y cambiamos las horas
              nuevoTimer[1] = 0;
              nuevoTimer[0]++;
              return nuevoTimer;
            }
          }
        }));
      },1000);
    }else{
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [inicio]);

  const iniciar = (modoPrueba) =>{
    setTextoCompletado("");
    if(inicio){
      setImagenReferenciaVisible("block");
      setTablero([]);
      setInicio(!inicio);
      setTextoInicio("Iniciar");
    }else{
      /*
        indice hace referencia a en que indice del tablero estan los datos
        id es la id de la foto para saber donde deberia ir en el table original
        activo es para llevar un control de si esta selecionado o no
        manejarClic es la funcion donde se controlara todo sobre activarlo,
        moverlo, verificar que estan bien colocados, etc
      */
      let nuevoTablero =
      [
        [{id: "00", activo: false}, {id: "01", activo: false}, {id: "02", activo: false}, {id: "03", activo: false}],
        [{id: "10", activo: false}, {id: "11", activo: false}, {id: "12", activo: false}, {id: "13", activo: false}],
        [{id: "20", activo: false}, {id: "21", activo: false}, {id: "22", activo: false}, {id: "23", activo: false}],
        [{id: "30", activo: false}, {id: "31", activo: false}, {id: "32", activo: false}, {id: "33", activo: false}]
      ]
      if (!modoPrueba) {
        console.log(modoPrueba);
        nuevoTablero.map(subArray =>(
          subArray.sort(() => 0.5 - Math.random())
        ));
        nuevoTablero.sort(() => 0.5 - Math.random());
      }
      setTablero(nuevoTablero);
      setInicio(!inicio);
      setTextoInicio("Detener");
      setImagenReferenciaVisible("none");
      setTimer([0,0,0]);
    }
  };

  const manejarClic = (e) =>{
    //guardamos la casilla clicada
    let casilla = JSON.parse(e.target.getAttribute("data-casilla"));
    //guardamos una copia del tablero donde haremos los cambios
    //let nuevoTablero = tablero;
    let nuevoTablero = JSON.parse(JSON.stringify(tablero));
    //funcion para desactivar la casilla seleccionada y vacias la casilla guardada
    const desactivar = () =>{
      nuevoTablero[casillaGuardada.indiceFila][casillaGuardada.indiceColumna].activo = false;
      setTablero(nuevoTablero);
      setCasillaGuardada("");
    }
    //funcion para mover las casillas
    const mover = () =>{
      //desactivamos la casilla guardada
      nuevoTablero[casillaGuardada.indiceFila][casillaGuardada.indiceColumna].activo = false;
      //movemos la casilla 33 a la nueva posicion
      nuevoTablero[casillaGuardada.indiceFila][casillaGuardada.indiceColumna].id = casilla.id;
      nuevoTablero[casillaGuardada.indiceFila][casillaGuardada.indiceColumna].indiceFila = casilla.indiceFila;
      nuevoTablero[casillaGuardada.indiceFila][casillaGuardada.indiceColumna].indiceColumna = casilla.indiceColumna;
      //ahora movemos la casilla guardada a la posicion de casilla 33
      nuevoTablero[casilla.indiceFila][casilla.indiceColumna].id = casillaGuardada.id;
      nuevoTablero[casilla.indiceFila][casilla.indiceColumna].indiceFila = casillaGuardada.indiceFila;
      nuevoTablero[casilla.indiceFila][casilla.indiceColumna].indiceColumna = casillaGuardada.indiceColumna;
      //cargamos el nuevo tablero
      setTablero(nuevoTablero);
      //vaciamos la casilla guardada
      setCasillaGuardada("");
    }
    //funcion para comprobar si el puzzle esta completo
    const completo = () =>{
      //cargamos un tablero original para comparar
      let tableroOriginal =
      [
        ["00", "01", "02", "03"],
        ["10", "11", "12", "13"],
        ["20", "21", "22", "23"],
        ["30", "31", "32", "33"]
      ];
      //en esta variable guardamos el numero de casillas correctas
      let correcto = 0;
      //recorremos el tablero comprobando las casillas correctas
      tableroOriginal.forEach((subArray, indiceFila) => {
        subArray.forEach((casillaOriginal, indiceColumna) => {
          if (casillaOriginal === nuevoTablero[indiceFila][indiceColumna].id) {
            correcto++;
          }
        })
      })
      //si las 16 casillas son correctas el puzzle esta completo
      if (correcto === 16) {
        setImagenReferenciaVisible("block");
        setTablero([]);
        setInicio(!inicio);
        setTextoInicio("Iniciar");
        setTextoCompletado(" Felicidades, completaste el puzzle");
      }
    }
    if (e.target.getAttribute("class") === "casillaTablero") {//si la casilla que hemos clicado no estaba activa comprobamos mas cosas
      if (casillaGuardada === ""){//miramos si hay casilla guardada para si no hay guardar la casilla clicada
        //si no hay casilla guardada lo guardaremos y activaremos la casilla
        //guardamos la casilla
        setCasillaGuardada(casilla);
        //vamos a activarlo, para ello necesitamos el indice de donde esta en el tablero
        nuevoTablero[casilla.indiceFila][casilla.indiceColumna].activo = true;
        setTablero(nuevoTablero);
      }else if((casilla.id === "33" && (casilla.id !== casillaGuardada.id)) || (casillaGuardada.id === "33" &&
      (casilla.id !== casillaGuardada.id))){
        //si hay una casilla guardada miramos que se cumplan una de las dos condiciones
        //1, si la casilla seleccionada es 33 y es diferente a la casilla guardada
        //o 2, si la casilla guardada es la 3 y es diferente de la casilla nueva
        //con esto nos aseguramos de que una casilla sea la 33 y la otra sea diferente
        //guardamos los indices por separado
        const fila1 = casillaGuardada.indiceFila;
        const col1 = casillaGuardada.indiceColumna;
        const fila2 = casilla.indiceFila;
        const col2 = casilla.indiceColumna;
        //ahora comprobamos si son adyacentes
        if ((fila1 === fila2 && Math.abs(col1 - col2) === 1) ||
        (col1 === col2 && Math.abs(fila1 - fila2) === 1)){
          //miramos de nuevo en dos condiciones distintas
          /*1, si estan en la misma fila, miramos si esta arriba o abajo, para ello los restamos,
          usamos la funcion para que siempre de positivo y si es 1, significa que esta a 1 casilla de distancia,
          ya sea arriba o abajo*/
          /*o 2, si estan en la misma columna, miramos si esta a la derecha o izquierda, para ello los restamos,
          usamos la funcion para que siempre de positivo y si es 1, significa que esta a 1 casilla de distancia,
          ya sea izquierda o derecha*/
          //si es correcto lo movemos
          mover();
        }
        //luego desactivamos la casilla
        desactivar();
        //y por ultimo hay que comprobar si ya esta el puzzle completo
        completo();

      }else{//si no estamos intentando cambiar una casilla con la 33, reseteamos la seleccion
        desactivar();
      }
    }else{//si hemos clicado en la casilla que ya estaba activa, la desactivamos
      desactivar();
    }
  }

  return(
    <div className="contenedorPuzzle">
      <div className="informacion">
        <button className="boton" onClick={() => iniciar(false)}>{textoInicio}</button>
        <button className="boton" onClick={() => iniciar(true)}>Modo prueba</button>
        {/*pasaremos el numero a string y con el metodo padSatart nos aseguramos de que minimo hayan dos
        caracteres, si no hay dos caracteres le añade un 0 a la izquierda, de esa forma formateamos el texto
        para que quede como 00:00:00*/}
        <span className="timer">
          Tiempo-
          {timer[0].toString().padStart(2, '0')}:
          {timer[1].toString().padStart(2, '0')}:
          {timer[2].toString().padStart(2, '0')}
          {textoCompletado}
        </span>
      </div>
      <div className="contenedorImagenReferencia">
        <img style={{display: imagenReferenciaVisible}} src="/imagenes/puzzle/wolf.png" alt="Foto de lobo"/>
      </div>
      <div className="contenedorTablero">
        <div className="tablero">
          {/* Renderizamos dinámicamente las casillas del tablero */}
          {tablero.map((subArray, indiceFila) => (
            subArray.map((casilla, indiceColumna) => {
              casilla.indiceFila = indiceFila;
              casilla.indiceColumna = indiceColumna;
              return <CasillaTablero
                casilla={casilla}
                manejarClic={manejarClic} //Pasamos la función que maneja el clic
              />
            })
          ))}
        </div>
      </div>
    </div>
  );
}

export default Puzzle;