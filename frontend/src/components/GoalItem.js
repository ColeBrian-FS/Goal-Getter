import React from 'react';

import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { FaWindowClose } from "react-icons/fa"

function GoalItem({ goal, key }) {
    const dispatch = useDispatch()

    return (
        <div className='goal' key={key}>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <h2>{goal.name}</h2>
            <p>{goal.description}</p>
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
                <FaWindowClose />
            </button>
            <div className='badge'>{goal.goal}</div>

        </div>
    )
}

export default GoalItem