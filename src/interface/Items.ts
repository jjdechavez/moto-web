export interface iItems {
    id: number;
    name: string;
    brand: string;
    category: string;
    serialNumber: string;
    quantity: number;
    dateAdded: string;
    price: number;
    status: number;
    user: {
        id: number;
        firstName: string;
    }
}