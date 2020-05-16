import { iItems } from "../interface/Items";

export type iDispatch = {
    type: string;
    payload?: iItems | string;
}

const fetchData = async (api: string) => {
    const res = await fetch(`http://localhost:5000/${api}`, {
        credentials: 'include'
    });
    return res.json();
}

export const getItems = async (dispatch: any) => {
    dispatch({ type: 'GET_ITEMS' });
    try {
        const json = await fetchData('item/all');
        dispatch({ type: 'GET_ITEMS_FULFILLED', payload: json.map((data: iItems) => data) });
        // dispatch({ type: 'GET_ITEMS_RESET' });
    } catch (error) {
        dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }
}

export const resetItemStatus = async (dispatch: any) => {
    dispatch({ type: 'GET_ITEMS_RESET' });
}