import { useEffect } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function Home() {
    const { workouts, dispatch } = useWorkoutsContext();

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
        <div className="max-sm:flex-col flex space-x-5 bg-gray-300 min-h-[calc(100vh-4rem)]">
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