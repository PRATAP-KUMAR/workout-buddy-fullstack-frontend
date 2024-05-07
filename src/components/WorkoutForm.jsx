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
        <form className="flex flex-col bg-toodark space-y-3 w-full p-5" onSubmit={handleSubmit}>
            <h3 className="text-center text-white font-bold font-josefin max-sm:hidden">Add a New Workout</h3>
            <label className="text-white">ET</label>
            <select
                className="border-none outline-none border-dark"
                name="workouts"
                onChange={(e) => setTitle(e.target.value)}>
                <option defaultValue={""}>Select workout from the dropdown</option>
                {
                    gymWorkoutNames.map(workout => (
                        <option value={workout} key={workout}>{workout}</option>
                    ))
                }
            </select>
            <label className="text-white">Load (in Kgs): </label>
            <input
                type="number"
                min={0}
                max={100}
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label className="text-white">Repetations: </label>
            <input
                type="number"
                min={1}
                max={20}
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button className="button w-fit mt-5">Add Workout</button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    )
}

export default WorkoutForm