import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"
import { FiSend } from "react-icons/fi"
function GoalsForm() {
    const initialState = {
        name: "",
        description: "",
        goal: "Priority"
    }
    const [text, setText] = useState(initialState);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const onChange = (e) => {
        setText((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()
        console.log({ id: user._id, ...text })
        const goalData = {
            user: user._id,
            ...text
        }
        dispatch(createGoal(goalData))
        setText(initialState)
    }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Name</label>
                    <input type="name" id="name" name="name" value={text.name} onChange={onChange} required ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input type="name" id="description" descripton="description" name="description" value={text.description} onChange={onChange} required ></input>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Goal Type</label>
                    <select name="goal" id="goal" value={text.goal} onChange={onChange} required>
                        <option value="Priority">Priority</option>
                        <option value="Hanlde Later One">Handle Later On</option>
                        <option value="Long Term Goal"> Long Term Goal</option>
                    </select>
                    {/* <input type="name" id="text" descripton="description" value={text.description} onChange={onChange} ></input> */}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-block">Add Goal <FiSend /></button>
                </div>
            </form>
        </section >
    )
}

export default GoalsForm