import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";
import API from "../../api";
import Modal from "./Modal";
import { useState } from "react";

function WorkoutDetails(props) {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const [modalOpen, setModalOpen] = useState(false);

    let obj = props;
    let { title, load, reps, createdAt, _id } = obj.workout;

    const removeWorkout = async () => {
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
        <div className="bg-toodark font-custom font-bold text-white border border-toodark flex flex-col p-2 relative shadow-custom">
            <h4>{title}</h4>
            <p>Load (Kg): {load}</p>
            <p>Reps: {reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <button className='absolute bottom-1 right-1 hover:text-white text-red-500' onClick={() => setModalOpen(true)}><RiDeleteBin6Line fontSize={24} />
            </button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <div className='w-full flex flex-col items-center rounded'>
                    <p className='text-dark font-bold'>Are you sure to delete the workout <span className='text-base text-orange-500 font-custom'>{title}</span>?</p>
                    <button className='text-red-500 hover:text-red-800'>
                        <RiDeleteBin6Line onClick={removeWorkout} fontSize={32} />
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default WorkoutDetails