import PropType from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import Task from 'src/pages/Home/components/TasksList/Task'

const TasksList = ({ tasks }) => {
    useEffect(() => {
        console.log('Render TasksList');
    })
    return <ol>
        {
            tasks.map((task) => (
                <Task key={task.id} {...task} />
            ))
        }
    </ol>
}

TasksList.propTypes = {
    tasks: PropType.arrayOf(PropType.shape({
        id: PropType.number.isRequired,
    })),
}

TasksList.defaultProps = {
    tasks: [],
}

export default React.memo(TasksList);