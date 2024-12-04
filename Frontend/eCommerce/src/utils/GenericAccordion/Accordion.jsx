import classes from "./Accordion.module.css";
import ProductAccordion from "./AccordionElement/ProductAccordion";

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
      <li key={i}> <ProductAccordion listElement={listElement}/> </li>
  ))) : <p>No existen elementos que listar</p>);
};