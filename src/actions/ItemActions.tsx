import React, { useContext } from "react";
import { ItemContext } from "../contexts/dashboard/ItemContext";

export const getItems = async () => {
    // const { dispatch } = useContext(ItemContext);
    // dispatch({ type: 'GET_ITEMS' });
    try {
        const res = await fetch('http://localhost:5000/item/all', {
            credentials: 'include'
        });
        const json = await res.json();
        console.log('json-----', json);
        // dispatch({ type: 'GET_ITEMS', payload: json });
    } catch (error) {
        console.log(error)
        // dispatch({ type: 'GET_ITEMS_FAILED', payload: error })
    }
}