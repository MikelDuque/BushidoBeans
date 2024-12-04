import { createContext, useState, useContext } from "react";

const ModalContext = createContext ({

  isOpen: false,
  openModal: () => {},
  closeModal: () => {}

});

export const useModal = () => {return useContext(ModalContext)}


export function ModalProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const contextValue = {
    isOpen,
    openModal,
    closeModal
  };

  return (<ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>);
};

