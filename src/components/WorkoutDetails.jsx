function WorkoutDetails(props) {
    let obj = props;
    let { title, load, reps, createdAt } = obj.workout;

    return (
        <div className="bg-green-200 px-5">
            <h4>{title}</h4>
            <p>Load (Kg): {load}</p>
            <p>Reps: {reps}</p>
            <p>{createdAt}</p>
        </div>
    )
}

export default WorkoutDetails