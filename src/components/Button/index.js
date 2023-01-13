import React from 'react';
import PropType from 'prop-types';
import './styles.scss'

function Button({ children, ...restProps }) {
    return (
        <button
            type="button"
            className="btn btn--primary"
            {...restProps}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    // childre est un noeud react peut importe le type
    children: PropType.node,
}

Button.defaultProps = {
    children: null,
}

export default React.memo(Button);