import { useState } from "react";
import OpenedProduct from "./OpenedProduct";
import ClosedProduct from "./ClosedProduct";

export default function ProductAccordion({listElement}) {
  const [displayFullElement, setDisplayFullElement] = useState(false);
  function openFullElement() {setDisplayFullElement(true)};
  function closeFullElement() {setDisplayFullElement(false)};

  return (displayFullElement ? <OpenedProduct listElement={listElement} closeFullElement={closeFullElement}/> : <ClosedProduct listElement={listElement} openFullElement={openFullElement}/>);
}