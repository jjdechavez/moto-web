import { Items } from "../contexts/dashboard/ItemContext"

export type ItemStatus = {
    sending: boolean;
    sent: boolean;
    error: string | null;
}

export interface iItemState {
    items: Items[];
    cart: Items[];
    currentItem: Items;
    getItemsStatus: ItemStatus;
    updateItemStatus: ItemStatus;
    createItemStatus: ItemStatus;
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
        case 'CREATE_ITEM': {
            let status = {
                ...state.createItemStatus,
                sending: true
            }
            return { ...state, createItemStatus: status }
        }
        case 'CREATE_ITEM_FULFILLED': {
            let status = {
                ...state.createItemStatus,
                sending: false,
                sent: true
            };
            return { ...state, createItemStatus: status, items: payload }
        }
        case 'CREATE_ITEM_ERROR': {
            let status = {
                ...state.createItemStatus,
                sent: false,
                error: payload
            };
            return { ...state, createItemStatus: status }
        }
        case 'CREATE_ITEM_RESET': {
            let status = {
                ...state.createItemStatus,
                sending: false,
                sent: false,
                error: null
            };
            return { ...state, createItemStatus: status }
        }
        case 'INSERT_INTO_CART': {
            let item = state.items.filter(item => item.id === payload);
            let cart = [...state.cart, ...item];

            // Change the status of the item. 1 represent was in cart
            let updateItems = state.items.map(item => {
                if (item.id === payload) {
                    item.status = 1;
                    console.log(item.quantity!, '-----------')
                    item.quantity = item.quantity! - 1;
                }
                return item;
            });

            return { ...state, cart, items: updateItems } 
        }
        case 'REMOVE_INTO_CART': {
            let cart = state.cart.filter(item => item.id !== payload);

            // Change the status of the item. 0 represent was remove on cart
            let updateItems = state.items.map(item => {
                if (item.id === payload) {
                    item.status = 0;
                }
                return item;
            });

            return { ...state, cart, items: updateItems } 
        }
        default:
            return state;
    }
}