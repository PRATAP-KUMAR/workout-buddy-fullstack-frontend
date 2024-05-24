import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { CiMinimize1 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import API from "../../api";

function Home() {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const [open, setOpen] = useState(false);

    const triggerForm = () => {
        setOpen(!open);
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`${API}/api/workouts/`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json })
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user])

    return (
        <div className="bg-lite">
            {
                <div className="flex-col xs:flex xs:flex-row min-h-[calc(100vh-4rem)] max-width bg-dark p-5">
                    <div className="block border-b border-toodark xs:hidden bg-lite">
                        <button onClick={triggerForm} className="w-full outline-none">
                            <div className="flex items-center justify-between bg-lite text-toodark p-4 font-bold">
                                <h3 className="text-center font-bold font-custom">Add a New Workout</h3>
                                {
                                    open ?
                                        <span><CiMinimize1 fontSize={24} /></span>
                                        :
                                        <span><IoMdAdd fontSize={24} /></span>
                                }
                            </div>
                        </button>
                        <div className="flex justify-center w-full xs:hidden">
                            {open && <WorkoutForm />}
                        </div>
                    </div>
                    {
                        workouts &&
                        workouts.length !== 0 &&
                        <div className="flex flex-col space-y-5 bg-lite p-5 xs:w-1/2">
                            <div className="text-center font-lg text-black font-bold font-custom">
                                Workouts
                            </div>
                            {workouts.map((workout) => (
                                <WorkoutDetails key={workout._id} workout={workout} />
                            ))}
                        </div>
                    }
                    {
                        workouts &&
                        workouts.length === 0 &&
                        <div>Ooops there are no workouts.</div>
                    }
                    <div className="hidden xs:block xs:w-1/2">
                        <WorkoutForm />
                    </div>
                </div>
            }
        </div>
    )
}

export default Home