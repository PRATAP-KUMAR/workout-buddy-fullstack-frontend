import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutDetails(props) {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    let obj = props;
    let { title, load, reps, createdAt, _id } = obj.workout;

    const handleClick = async () => {
        if (!user) return;

        const response = await fetch('http://localhost:4000/api/workouts/' + _id, {
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
        <div className="bg-white p-5 border-2 flex flex-col space-y-2 relative shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
            <h4 className="font-bold text-lg">{title}</h4>
            <p>Load (Kg): {load}</p>
            <p>Reps: {reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <button className='absolute top-5 right-5 hover:text-blue-500 text-orange-400' onClick={handleClick}><RiDeleteBin6Line fontSize={24} />
            </button>
        </div>
    )
}

export default WorkoutDetails