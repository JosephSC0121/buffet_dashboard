"use server";

import { createDirectus, rest, readItems, updateItem } from "@directus/sdk";

const directus = createDirectus("http://localhost:8055/").with(rest());

export async function getIngredients() {
    return directus.request(readItems("ingredientes"));
}
export async function getRecipes() {
    return directus.request(readItems("recetas"));
}



// export async function updateItemProtein(id: number, quantity: number) {
//     return directus.request(updateItem("Proteinas", id, { cantidad: quantity }));
// }

