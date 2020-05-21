import { iItemState } from "../../reducers/ItemReducer";

export interface iItemContext {
    state: {
        edit: boolean;
    };
    setState: {
        setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    };
    itemState: iItemState;
    dispatch({ type, payload } : { type: string, payload?: any | null }): void;
}