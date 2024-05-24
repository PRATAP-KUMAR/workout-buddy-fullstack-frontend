import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import gymWorkoutNames from "../gym-workout-names";

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = {
            title, load, reps
        }

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            e.target.reset();
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added');
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    }

    return (
        <form className="flex flex-col bg-toodark space-y-3 w-full p-5 max-xs:pt-0" onSubmit={handleSubmit}>
            <h3 className="text-center text-white font-bold font-custom hidden xs:block">
                Add a New Workout
            </h3>
            <label className="text-white">Exercise Title</label>
            <select
                className="border-none outline-none border-dark px-2 py-1"
                name="workouts"
                defaultValue={""}
                required
                onChange={(e) => setTitle(e.target.value)}>
                <option value={""} disabled className="font-custom px-2 py-1">Select a Workout</option>
                {
                    gymWorkoutNames.map(workout => (
                        <option className="font-custom p-2" value={workout} key={workout}>{workout}</option>
                    ))
                }
            </select>
            <label className="text-white">Load (in Kgs): </label>
            <input
                type="number"
                required
                min={0}
                max={100}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className="px-2 py-1"
            />
            <label className="text-white">Repetations: </label>
            <input
                type="number"
                required
                min={1}
                max={20}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className="px-2 py-1"
            />
            <button className="btn bg-lite hover:bg-toodark hover:text-white  w-fit">Add Workout</button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    )
}

export default WorkoutForm