import React from "react";
import Segmento from "../componentes/segmento.js";
import "../css/sobreMi.css";

function SobreMi() {
  return(
    <div className="contenedorSegmentos">
      <Segmento
        imagen="jose"
        titulo="Bienvenidos"
        texto='¡Hola soy José Francisco, bienvenido a mi portafolio! En esta primera sesión "sobre mí"
        voy a contarte un poco sobre mi recorrido en los estudios de la informática
        y la programación. En las otras secciones del portafolio podrás encontrar diversos
        desarrollos de ejercicio que hice en el ciclo formativo con el uso de html, css y javascript
        entre otros, pero ahora actualizado a React.'
      />
      <Segmento
        imagen="ulpgc"
        titulo="Primeros pasos, universidad"
        texto="Empecé mis andanzas en la programación con la ingeniería informática, ahí fue donde
        comencé a aprender programación con java y vi lo mucho que me gustaba. Estuve dos años,
        pero lamentablemente tuve que dejarlo por problemas económicos."
      />
      <Segmento
        imagen="cifp"
        titulo="Primer ciclo superior, Asir"
        texto="Tras dejar la universidad y regresar a casa, continué mis estudios en el ciclo superior de
        Administración de sistemas informáticos en red, ya que no quería dejar la informática y sobre todo
        la programación. Terminé el primer año satisfactoriamente, sin embargo, este ciclo ofrecia un contenido
        reducido en programacion, por ello, tuve que cambiar de ciclo a otro que ofrecia lo que yo buscaba,
        formación en programación."
      />
      <Segmento
        imagen="cifp"
        titulo="El segundo ciclo superior, Daw"
        texto="Este sí que era el ciclo que buscaba, Desarrollo de Aplicaciones web,
        ahí aprendí mucho sobre programación, html, css, javascript entre otras muchas cosas.
        Terminé el ciclo y las prácticas con éxito graduándome y obteniendo el título.
        Tras esta formación, continué con otros estudios diferentes a la informática."
      />
      <Segmento
        imagen="react"
        titulo="Finalmente, los orígenes"
        texto="Después de varios años de estudio y preparación, decidí que ya era momento de trabajar.
        Todavía tenía muchas ganas de seguir con la informática y la programación,
        así que regrese a los orígenes. Primero refresqué bien los conocimientos front-end,
        para luego comenzar a aprender, de manera autodidacta, sobre React, librería utilizada
        para realizar este portafolio."
      />
    </div>
  );
}

export default SobreMi;