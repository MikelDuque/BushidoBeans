import { useState } from "react";
import OpenedProduct from "./ProductElement/OpenedProduct";
import ClosedProduct from "./ProductElement/ClosedProduct";

import classes from "./ProductAccordion.module.css"

export default function ProductAccordion({list, selectedProduct, submit}) {
  const [currentElement, setCurrentElement] = useState(0);

  function listMapper() {
    return(list.length > 0 ? (
      list.map((listElement, i) => (
        <li key={i}> <AccordionElement listElement={listElement} selectedProduct={selectedProduct} submit={submit} currentElement={currentElement} setCurrentElement={setCurrentElement}/> </li>
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
/*
function ProductAccordion({listElement, submit}) {
  const [displayFullElement, setDisplayFullElement] = useState(false);
  function openFullElement() {setDisplayFullElement(true)};
  function closeFullElement() {setDisplayFullElement(false)};

  return (displayFullElement ? <OpenedProduct listElement={listElement} closeFullElement={closeFullElement} submit={submit}/> : <ClosedProduct listElement={listElement} openFullElement={openFullElement}/>);
}
  */