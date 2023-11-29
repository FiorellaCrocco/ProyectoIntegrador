import { useState } from "react";
import stylesP from "./Politicas.module.css";
import politicasData from "./politicasData";

function Politicas() {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  const showText = (index) => {
    setVisibleIndex(index === visibleIndex ? -1 : index);
  document.body.style.overflow = index === visibleIndex ? 'auto' : 'hidden';
  };
  const hideText = () => {
    setVisibleIndex(-1);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={stylesP.politicascontainer}>
      <h2 className={stylesP.titulopolitica}>Politicas</h2>
      <div className={stylesP.politicascontainercolum}>
        {politicasData.map((item, index) => (
          <div className={stylesP.politicascontainercolum1} key={index}>
            <h4 className={stylesP.tituloh4} onClick={() => showText(index)}>
              {item.title}
            </h4>
            {visibleIndex === index && (
              <div className={stylesP.politicaModalContainer}>
                <div className={stylesP.politicaModalBody}>
                  <button className={stylesP.politicaCloseModal} onClick={hideText}>x</button>
                  <h4>{item.title}</h4>
                  <h6 className={stylesP.politicaContent}>{item.content}</h6>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Politicas;

{
  /* <div className={stylesP.politicascontainercolum1}>
            <h4 className={stylesP.tituloh4}>Términos y Condiciones</h4>
            <h6>
              Los siguientes términos y condiciones rigen el uso que usted le dé
              a este Sitio Web https://onlybooks.isanerd.club y a cualquiera de
              los contenidos disponibles por o a través de este Sitio,
              incluyendo cualquier contenido derivado del mismo (el Sitio Web
              https://onlybooks.isanerd.club ). ONLYBOOKS S.A., en adelante
              ONLYBOOKS, ha puesto a su disposición el presente Sitio Web
              https://onlybooks.isanerd.club. ONLYBOOKS, puede cambiar los
              Términos y Condiciones de vez en cuando, en cualquier momento sin
              ninguna notificación, sólo publicando los cambios en este Sitio
              Web https://onlybooks.isanerd.club. AL USAR EL SITIO, USTED ACEPTA
              Y ESTA DE ACUERDO CON ESTOS TÉRMINOS Y CONDICIONES EN LO QUE SE
              REFIERE A SU USO DEL SITIO WEB. Si usted no está de acuerdo con
              estos Términos y Condiciones, no puede tener acceso al mismo ni
              usar el Sitio Web https://onlybooks.isanerd.club de ninguna otra
              manera.
            </h6>
          </div> */
}
