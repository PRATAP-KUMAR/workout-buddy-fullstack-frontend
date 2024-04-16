import { createContext, useReducer } from "react";
import PropTypes from 'prop-types';
import workoutsReducer from "../reducers/workoutReducer";


export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {
        wokouts: null
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}

WorkoutsContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};