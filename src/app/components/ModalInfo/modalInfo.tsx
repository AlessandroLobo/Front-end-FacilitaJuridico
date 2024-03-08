
import { X } from '@phosphor-icons/react';
import React from 'react';
import './styles.css'


interface ModalInfoProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backDropClose?: boolean;
}

function ModalInfo({ children, isOpen, setIsOpen, backDropClose }: ModalInfoProps) {
  if (!isOpen) return null;

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (backDropClose) {
      setIsOpen(false);
    }
  };
  return (
    <>
      {isOpen && <div className="overlay" onClick={handleBackDropClick} />}
      <div className="main">
        <div className="containerModal">
          <div className="containerButton">
            <button className="buttonModal" type="button" onClick={() => setIsOpen(false)}>
              <X className="customX" />
            </button>
          </div>
          <div className="containerText">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ModalInfo;