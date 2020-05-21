import { Items } from "../contexts/dashboard/ItemContext"

export type ItemStatus = {
    sending: boolean;
    sent: boolean;
    error: string | null;
}

export interface iItemState {
    items: Items[];
    currentItem: Items;
    getItemsStatus: ItemStatus;
    getCurrentItemStatus: ItemStatus;
}

export const ItemReducer = (
    state: iItemState,
    { type, payload } : { type: string, payload?: any | null } 
): iItemState => {
    switch(type) {
        case 'GET_ITEMS': {
            let status = {
                ...state.getItemsStatus,
                sending: true
            }
            return { ...state,  getItemsStatus: status }
        }
        case 'GET_ITEMS_FULFILLED': {
            let status = {
                ...state.getItemsStatus,
                sending: false,
                sent: true
            }
            return { ...state, getItemsStatus: status, items: payload }
        }
        case 'GET_ITEMS_FAILED': {
            let status = {
                ...state.getItemsStatus,
                sending: false,
                error: payload
            }
            return { ...state, getItemsStatus: status }
        }
        case 'GET_ITEMS_RESET': {
            let status = {
                ...state.getItemsStatus,
                sending: false,
                sent: false,
                error: null
            }
            return { ...state, getItemsStatus: status }
        }
        case 'GET_CURRENT_ITEM': {
            let status = {
                ...state.getCurrentItemStatus,
                sending: false,
                sent: true
            }

            const currentItem = {
                ...state.currentItem,
                ...payload
            }

            return { ...state, getCurrentItemStatus: status, currentItem }
        }
        default:
            return state;
    }
}