import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts');
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        }
        fetchWorkouts();
    }, [])

    return (
        <div className="flex">
            <div className="flex flex-col w-3/5 space-y-2">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <div className="flex flex-col w-2/5 space-y-2">
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home