import { Items } from "../contexts/dashboard/ItemContext"

export type ItemStatus = {
    sending: boolean;
    sent: boolean;
    error: string | null;
}

export interface iItemState {
    items: Items[];
    getItemsStatus: ItemStatus;
}

export const ItemReducer = (state: iItemState, {type, payload}: {type: string, payload?: any | null}): iItemState => {
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
            return { ...state, items: payload }
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
        default:
            return state;
    }
}