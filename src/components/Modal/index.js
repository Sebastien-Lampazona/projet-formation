import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';

function Modal({ children }, ref) {
    const [visible, setVisible] = useState(false);
    const nodeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            setVisible(true);
        },
        close: () => {
            setVisible(false);
        },
    }), []);

    return (
        <CSSTransition
            in={visible}
            nodeRef={nodeRef}
            timeout={500}
            className="modal"
            classNames="modal"
            unmountOnExit
        >
            <div ref={nodeRef}  onClick={() => setVisible(false)}>
                <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </CSSTransition>
    );
}
export default React.memo(React.forwardRef(Modal));
