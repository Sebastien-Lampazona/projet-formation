import PropType from 'prop-types';
import React, { useEffect } from 'react';
import './styles.scss'

function Task({ title, description }) {
    useEffect(() => {
        console.log('Render Task');
    })
    return (
        <li className="task">
            <span className="task__title">{title}</span>
            {description?.trim() !== "" && (
                <span className="task__description"> - {description}</span>
            )}
        </li>
    )
}

Task.propTypes = {
    // Le titre est obligatoire , sans titre la task n'a pas de sens
    title: PropType.string.isRequired,
    // Par contre la description n'est pas obligatoire donc pas de isRequired
    description: PropType.string,
}

Task.defaultProps = {
    // Comme la description n'est pas obligatoire, on lui donne une valeur par défault
    description: null,
}

export default React.memo(Task);