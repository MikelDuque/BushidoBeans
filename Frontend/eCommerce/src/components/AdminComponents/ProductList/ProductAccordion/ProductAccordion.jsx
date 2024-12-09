import { useState } from "react";
import OpenedProduct from "./ProductElement/OpenedProduct";
import ClosedProduct from "./ProductElement/ClosedProduct";

import classes from "./ProductAccordion.module.css"

export default function ProductAccordion({list, submit}) {
  const [currentElement, setCurrentElement] = useState(0);

  function listMapper() {
    return(list.length > 0 ? (
      list.map((listElement, i) => (
        <li key={i}> <AccordionElement listElement={listElement} submit={submit} currentElement={currentElement} setCurrentElement={setCurrentElement}/> </li>
    ))) : <p>No existen elementos que listar</p>);
  };

  return(
    <ul className={classes.container}>
      {listMapper()}
    </ul>
  );
};

function AccordionElement({listElement, submit, currentElement, setCurrentElement}) {
  const isOpen = currentElement === listElement.id;
  function handleCurrentElement() {setCurrentElement(isOpen ? null : listElement.id)};
  

  return (isOpen ? <OpenedProduct listElement={listElement} submit={submit}/> : <ClosedProduct listElement={listElement} openFullElement={handleCurrentElement}/>);
}