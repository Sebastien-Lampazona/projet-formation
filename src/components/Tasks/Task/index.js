import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function Task({
    title,
    description,
}) {
    const nodeRef = useRef(null);
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
    }, [])

    return (
        <CSSTransition
            in={inProp}
            nodeRef={nodeRef}
            timeout={500}
            className="task"
            classNames="task"
            unmountOnExit
        >
            <li ref={nodeRef}>
                <strong>{title}</strong>
                <p>{description}</p>
            </li>
        </CSSTransition>
    );
}
export default React.memo(Task);
