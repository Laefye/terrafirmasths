const ITEMS = 'anvil_storage_items';

export type Item = {
    id: number;
    name: string;
    conditions: number[];
    fromPoints: number;
    toPoints: number;
}

export function createItem(name: string, conditions: number[], fromPoints: number, toPoints: number): Item {
    return {
        id: Date.now(),
        name,
        conditions,
        fromPoints,
        toPoints
    };
}

export function saveItem(item: Item) {
    const items = loadItems();
    items.push(item);
    localStorage.setItem(ITEMS, JSON.stringify(items));
}

export function loadItems(): Item[] {
    const data = localStorage.getItem(ITEMS);
    if (!data) {
        return [];
    }
    return JSON.parse(data) as Item[];
}

export function deleteItem(id: number) {
    const items = loadItems();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(ITEMS, JSON.stringify(filtered));
}
