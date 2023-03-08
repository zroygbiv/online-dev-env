import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// Interprets type of data in redux store 
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;