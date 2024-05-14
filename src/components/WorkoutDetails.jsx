import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";
import API from "../../api";

function WorkoutDetails(props) {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    let obj = props;
    let { title, load, reps, createdAt, _id } = obj.workout;

    const handleClick = async () => {
        if (!user) return;

        const response = await fetch(`${API}/api/workouts/` + _id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className="bg-dark text-white p-5 border-2 flex flex-col space-y-2 relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h4 className="font-bold text-lg text-toodark">{title}</h4>
            <p>Load (Kg): {load}</p>
            <p>Reps: {reps}</p>
            <p className="text-toodark">{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <button className='absolute top-5 right-5 hover:text-white text-toodark' onClick={handleClick}><RiDeleteBin6Line fontSize={24} />
            </button>
        </div>
    )
}

export default WorkoutDetails