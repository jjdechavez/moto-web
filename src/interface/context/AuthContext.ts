import { IAuthState } from "../../reducers/AuthReducer";

export interface IAuthContextProps {
    state: any;
    setState: any;
    authState: IAuthState;
    dispatch({ type, payload } : { type: string, payload?: any | null }): void;
}