import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { CiMinimize1 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import ErrorPage from "./ErrorPage";

function Home() {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    const triggerForm = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/workouts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json })
                }
            } catch (error) {
                setFetchError(error);
                console.log(error);
                console.log(JSON.parse(error));
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user])

    return (
        <>
            {
                fetchError &&
                <ErrorPage />
            }
            {
                !fetchError &&
                <div className="max-sm:flex-col max-sm:space-x-0  sm:justify-center space-y-5 flex space-x-5 p-5 bg-lite min-h-[calc(100vh-4rem)]">
                    {
                        workouts &&
                        <>
                            <div className="w-full max-sm:block hidden ">
                                <button onClick={triggerForm} className="btn-blue w-full">
                                    <div className="flex items-center justify-between bg-toodark text-white p-4 font-bold">
                                        Add a Workout {
                                            open ?
                                                <span><CiMinimize1 fontSize={24} /></span>
                                                :
                                                <span><IoMdAdd fontSize={24} /></span>
                                        }
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
                        </>
                    }
                </div>
            }
        </>
    )
}

export default Home