import { useState } from "react";
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"

function GoalsForm() {
    const [text, settext] = useState();
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        dispatch(createGoal({ text }))
        settext('')
    }
    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="name" id="text" value={text} onChange={(e) => settext(e.target.value)} ></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block">Add Goal</button>
                </div>
            </form>

        </section >
    )
}

export default GoalsForm