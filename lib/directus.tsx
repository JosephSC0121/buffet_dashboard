"use server";

import { createDirectus, rest, readItems, updateItem, createItem } from "@directus/sdk";

const directus = createDirectus("http://localhost:8055/").with(rest());

export async function getIngredients() {
    return directus.request(readItems("ingredientes"));
}
export async function getRecipes() {
    return directus.request(readItems("recetas"));
}

export async function createOrdenDia(data: any) {
    return directus.request(createItem("orden_dia", data));
}

export async function getOrdenDia() {
    return directus.request(readItems("orden_dia"));
}

export async function getOrdenDiaByDate(date: string) {
    return directus.request(readItems("orden_dia", { filter: { date_created: date } }));
}

export async function updateIngrediente(id: number, cantidad_disponible: any) {
    return directus.request(updateItem("ingredientes", id, cantidad_disponible));
}

export async function checkInventoryQuantity(nombre: string) {
    return directus.request(readItems("ingredientes", { filter: { nombre: nombre } }));
}

export async function getRecetaById(id: number) {
    return directus.request(readItems("recetas", { filter: { id: id } }));
}

export async function updateOrdenById(id: number, cantidad: any) {
    return directus.request(updateItem("orden_dia", id, cantidad));
}

// export async function updateItemProtein(id: number, quantity: number) {
//     return directus.request(updateItem("Proteinas", id, { cantidad: quantity }));
// }

