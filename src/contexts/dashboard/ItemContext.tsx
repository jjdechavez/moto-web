import React, { createContext, useReducer, useState } from "react";
import { ItemReducer, iItemState } from "../../reducers/ItemReducer";
import logger from 'use-reducer-logger';

export interface ItemUser {
    id: number | null;
    firstName: string | null;
}

export interface Items {
    id: number | null;
    name: string;
    brand: string;
    category: string;
    quantity: number | null;
    price: number;
    dateAdded?: string;
    serialNumber: string;
    status: number | null;
    user: ItemUser
}

export interface iItemContext {
    state: {
        edit: boolean;
        remove: boolean;
        create: boolean;
        checkout: boolean;
    };
    setState: {
        setEdit: React.Dispatch<React.SetStateAction<boolean>>;
        setRemove: React.Dispatch<React.SetStateAction<boolean>>;
        setCreate: React.Dispatch<React.SetStateAction<boolean>>;
        setCheckout: React.Dispatch<React.SetStateAction<boolean>>;
    };
    itemState: iItemState;
    dispatch({ type, payload } : { type: string, payload?: any | null }): void;
}

export const ItemContext = createContext({} as iItemContext);

const ItemContextProvider = (props: any) => {
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [create, setCreate] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const initialState = {
        items: [],
        cart: [],
        currentItem: {
            id: null,
            name: '',
            brand: '',
            category: '',
            serialNumber: '',
            price: 0,
            status: null,
            quantity: null,
            user: {
                id: null,
                firstName: ''
            }
        },
        getItemsStatus: {
            sending: false,
            sent: false,
            error: null
        },
        updateItemStatus: {
            sending: false,
            sent: false,
            error: null
        },
        createItemStatus: {
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

    const value ={
        state: {
            edit,
            remove,
            create,
            checkout
        },
        setState: {
            setEdit,
            setRemove,
            setCreate,
            setCheckout
        },
        itemState,
        dispatch
    }

    return (
        <ItemContext.Provider value={value}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemContextProvider;