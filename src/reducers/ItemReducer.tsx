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
    updateItemStatus: ItemStatus;
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
            const currentItem = {
                ...state.currentItem,
                ...payload
            }

            return { ...state, currentItem }
        }
        case 'UPDATE_ITEM': {
            let status = {
                ...state.updateItemStatus,
                sending: true
            }
            return { ...state, updateItemStatus: status }
        }
        case 'UPDATE_ITEM_FULFILLED': {
            let status = {
                ...state.updateItemStatus,
                sending: false,
                sent: true
            }

            let currentItem = {
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
            }

            return { ...state, items: payload, updateItemStatus: status, currentItem }
        }
        case 'UPDATE_ITEM_ERROR': {
            let status = {
                ...state.updateItemStatus,
                sent: false,
                error: payload
            }
            return { ...state, getItemsStatus: status }
        }
        case 'UPDATE_ITEM_RESET': {
            let status = {
                sending: false,
                sent: false,
                error: null
            }
            return { ...state, updateItemStatus: status }
        }
        case 'DELETE_ITEM': {
            let deleteItem = state.items.filter(item => item.id !== payload);
            return {
                ...state,
                items: deleteItem
            }
        }
        // case 'DELETE_ITEM_ERROR': {

        // }
        default:
            return state;
    }
}