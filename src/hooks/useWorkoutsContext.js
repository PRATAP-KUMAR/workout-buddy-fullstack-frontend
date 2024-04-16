import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('Context must be used only inside provider')
    }

    return context;
}