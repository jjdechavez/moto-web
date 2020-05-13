import React, { createContext, useReducer } from "react";
import { ItemReducer } from "../../reducers/ItemReducer";
import { iItemContext } from "../../interface/context/ItemContext";
import logger from 'use-reducer-logger';

export interface ItemUser {
    id: number;
    firstName: string;
}

export interface Items {
    id: number;
    name: string;
    brand: string;
    category: string;
    quantity: number;
    serialNumber: string;
    status: number;
    user: ItemUser
}

export const ItemContext = createContext({} as iItemContext);

const ItemContextProvider = (props: any) => {
    const initialState = {
        items: [],
        getItemsStatus: {
            sending: false,
            sent: false,
            error: null
        }
    }

    const [itemState, dispatch] = useReducer(
        process.env.NODE_ENV === 'development' 
            ? logger(ItemReducer) 
            : ItemReducer, initialState
    );

    return (
        <ItemContext.Provider value={{itemState, dispatch}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider;