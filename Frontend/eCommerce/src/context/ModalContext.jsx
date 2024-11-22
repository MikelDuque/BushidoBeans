import { createContext, useState } from "react";

const ModalContext = createContext ({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

function ModalProvider({children}) {
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

export {ModalContext, ModalProvider};