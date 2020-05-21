import { getAccessToken } from "../components/utils/accessToken";
import { changePort } from "./AuthActions";
import { Items } from "../contexts/dashboard/ItemContext";

export type iDispatch = {
    type: string;
    payload?: string;
}

export const fetchData = async (api: string) => {
    const accessToken = getAccessToken();
    const res = await fetch(`http://localhost:${changePort}/${api}`, {
        credentials: "include",
        headers: {
            'Authorization': accessToken ? `Bearer ${accessToken}`: ''
        }
    });
    return res.json();
}

export const getItems = async (dispatch: any) => {
    dispatch({ type: 'GET_ITEMS' });
    try {
        const json = await fetchData('item/all');
        dispatch({ type: 'GET_ITEMS_FULFILLED', payload: json.map((data: Items) => data) });
    } catch (error) {
        dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }
}

export const resetItemStatus = async (dispatch: any) => {
    dispatch({ type: 'GET_ITEMS_RESET' });
}