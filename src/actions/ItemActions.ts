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

export const updateItem = async (
    dispatch: any, 
    id: number,
    name: string, 
    brand: string, 
    category: string, 
    price: number, 
    quantity: number
) => {
    dispatch({ type: 'UPDATE_ITEM' });
    try {
        const accessToken = getAccessToken();
        const res = await fetch(`http://localhost:${changePort}/item/update`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken ? `Bearer ${accessToken}` : ''
            },
            body: JSON.stringify({
                id,
                name,
                brand,
                category,
                price,
                quantity
            })
        });
        const json = await res.json();
        dispatch({ type: 'UPDATE_ITEM_FULFILLED', payload: json.items.map((item: Items) => item) });
    } catch (error) {
        dispatch({ type: 'UPDATE_ITEM_ERROR', payload: error });
    }
}

export const resetUpdateItem = (dispatch: any) => {
    dispatch({ type: 'UPDATE_ITEM_RESET' });
}