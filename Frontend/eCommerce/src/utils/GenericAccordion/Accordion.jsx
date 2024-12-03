import classes from "./Accordion.module.css";
import AccordionElement from "./AccordionElement/AccordionElement";

export default function Accordion({list}) {

  return(
    <ul className={classes.container}>
      {listMapper(list)}
    </ul>
  );
};

function listMapper(list) {
  return(list.length > 0 ? (
    list.map((listElement, i) => (
      <li key={i}> <AccordionElement listElement={listElement}/> </li>
  ))) : <p>No existen elementos que listar</p>);
};

/*
function selectedElement({listElement, selectedElement}) {
  return(
    <li>
      Hola
    </li>
  );
};
*/