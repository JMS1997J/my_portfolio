import Prueba from "./paginas/prueba.js";
import SobreMi from "./paginas/sobreMi.js";
import Puzzle from "./paginas/puzzle.js";
import './App.css';
import Fondo from "./componentes/fondo/fondo.js";
import BotonesColores from "./componentes/fondo/botonesColoresFondo.js";
import Calculadora from "./componentes/calculadora/calculadora.js";
import { useState } from "react"; //useEffect
import { Route, Routes, Link } from "react-router-dom";

function App() {
  //cosas para el fondo y los botones de eleccion del color del fondo
  const [colorFijo, setColorFijo] = useState("");
  const cambiarColorFijo = (color) => {
    setColorFijo(color);
  };
  return (
    <div className="App">
      <div className="contenedorFondo">
        <Fondo colorInicial="red" duracionTransicionInicial="5s" duracionDelayInicial="5s" colorFijo={colorFijo} />
        <Fondo colorInicial="blue" duracionTransicionInicial="5s" duracionDelayInicial="5s" colorFijo={colorFijo} />
        <Fondo colorInicial="green" duracionTransicionInicial="5s" duracionDelayInicial="5s" colorFijo={colorFijo} />
        <Fondo colorInicial="purple" duracionTransicionInicial="5s" duracionDelayInicial="5s" colorFijo={colorFijo} />
      </div>
      <div className="contenedorBotonesFijos">
        <BotonesColores cambiarColorFijo={cambiarColorFijo}/>
        <Calculadora/>
      </div>
      <nav className="navegadorContenedor" >
        <Link to="/"><button className="boton">Sobre mí</button></Link>
        <Link to="/puzzle"><button className="boton">Puzzle</button></Link>
        <Link to="/prueba"><button className="boton">prueba</button></Link>
      </nav>
      <Routes>
        <Route path="/" element={<SobreMi/>} />
        <Route path="/puzzle" element={<Puzzle/>}/>
        <Route path="/prueba" element={<Prueba/>}/>
      </Routes>
    </div>
  );
}

export default App;