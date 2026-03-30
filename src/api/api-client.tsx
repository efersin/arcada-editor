import { STATIC_CATEGORIES, STATIC_FURNITURE } from "./static-data";

export const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'http://localhost:4133/';

export async function getCategoriesRequest() {
    try {
        let res = await fetch(endpoint + "categories");
        if(res.ok) return await res.json();
    } catch (e) {
        console.warn("Backend unreachable. Using static categories.");
    }
    return STATIC_CATEGORIES.filter(c => c.visible); // static fallback
}

export async function getCategoryInfo(categoryId:string) {
    try {
        let res = await fetch(endpoint + 'category/' + categoryId);
        if(res.ok) return await res.json();
    } catch (e) {
        console.warn("Backend unreachable. Using static furniture for category.");
    }
    return STATIC_FURNITURE.filter(f => f.category === categoryId);
}

export async function getWindow() {
    try {
        let res = await fetch(endpoint + "wall/window");
        if (res.ok) return await res.json();
    } catch(e) {
        console.warn("Backend unreachable. Using static window.");
    }
    return STATIC_FURNITURE.filter(f => f.name === "Window");
}

export async function getDoor() {
    try {
        let res = await fetch(endpoint + "wall/door");
        if (res.ok) return await res.json();
    } catch(e) {
        console.warn("Backend unreachable. Using static door.");
    }
    return STATIC_FURNITURE.filter(f => f.name === "Door");
}