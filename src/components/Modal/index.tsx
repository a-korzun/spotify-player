import React from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
}

function Modal({ open = false, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className="modal">
        <div className="modal__backdrop" onClick={onClose} />
        <div className="modal__container">
          <div className="modal__head">
            <button className="modal__close" onClick={onClose}>❌</button>
          </div>
          <div className="modal__body">
            { children }
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default Modal;

interface PortalProps {
  children: React.ReactNode | React.ReactNode[];
  parent?: HTMLElement;
}

function Portal({ children, parent = document.body }: PortalProps) {
  const element = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    parent.appendChild(element);

    return () => {
      parent.removeChild(element);
    }
  }, [element, parent]);

  return ReactDOM.createPortal(children, element);
}