export interface iItemContext {
    itemState: any;
    dispatch({ type, payload } : { type: string, payload?: any | null }): void;
}