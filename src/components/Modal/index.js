import PropTypes from 'prop-types';
import React, { useState, useImperativeHandle } from 'react';
import Button from 'src/components/Button';
import './styles.scss';

const Modal = ({ children }, modalRef) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(modalRef, () => ({
        open: () => {
            setIsVisible(true);
        },
        close: () => {
            setIsVisible(false);
        }
    }), []);
 
    
    return (
        <div className={`modal ${isVisible ? 'modal--visible' : ''}`} ref={modalRef}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                {children}

                <Button onClick={() => setIsVisible(false)}>Valider</Button>
            </div>
        </div>
    )
}

export default React.forwardRef(Modal);

