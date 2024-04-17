import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
    const { workouts, dispatch } = useWorkoutsContext();
    const [open, setOpen] = useState(false);

    const triggerForm = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        fetchWorkouts();
    }, [dispatch])

    return (
        <div className="max-sm:flex-col max-sm:space-x-0  sm:justify-center space-y-5 flex space-x-5 p-5 bg-gray-300 min-h-[calc(100vh-4rem)]">
            <div className="w-full max-sm:block hidden ">
                <button onClick={triggerForm} className="btn-blue w-full">
                    <div className="flex items-center justify-between">
                        Add a Workout {open ? <span className="text-3xl">-</span> : <span className="text-3xl">+</span>}
                    </div>
                </button>
                <div className="flex justify-center w-full sm:hidden">
                    {open && <WorkoutForm />}
                </div>
            </div>
            <div className="flex flex-col max-sm:w-full w-3/5 space-y-2">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <div className="max-sm:hidden w-2/5">
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home