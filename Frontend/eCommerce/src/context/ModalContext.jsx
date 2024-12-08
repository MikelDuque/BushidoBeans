import { createContext, useState, useContext } from "react";

const ModalContext = createContext ({

  whichIsOpen: null,
  openModal: () => {},
  closeModal: () => {}

});

export const useModal = () => {return useContext(ModalContext)}


export function ModalProvider({children}) {
  const [whichIsOpen, setWhichIsOpen] = useState(null);

  function openModal(id) {
    setWhichIsOpen(id);
  };

  function closeModal() {
    setWhichIsOpen(null);
  };

  const contextValue = {
    whichIsOpen,
    openModal,
    closeModal
  };

  return (<ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>);
};

