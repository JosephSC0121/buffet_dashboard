"use client";
import { getRecetaById, checkInventoryQuantity, updateIngrediente } from "@/lib/directus";

export const useInventoryCheck = () => {
    const checkAndUpdateInventory = async (orders) => {
        let allIngredientsAvailable = true;
        let missingIngredients = [];

        for (const order of orders) {
            const recetaInfo = await getRecetaById(order.receta);
            const ingredientes = recetaInfo.flatMap(receta =>
                receta.ingredientes.map(ing => {
                    const [nombre, cantidadBase, unidad] = ing.split("_");
                    return {
                        nombre,
                        cantidadNecesaria: parseFloat(cantidadBase) * order.cantidad, // Multiply by order quantity
                        unidad
                    };
                })
            );

            for (const ingrediente of ingredientes) {
                const stockData = await checkInventoryQuantity(ingrediente.nombre);
                console.log(stockData);
                const stockDisponible = stockData?.[0]?.cantidad_disponible || 0;

                if (stockDisponible >= ingrediente.cantidadNecesaria) {
                    // Update stock
                    await updateIngrediente(stockData[0].id, {
                        cantidad_disponible: stockDisponible - ingrediente.cantidadNecesaria
                    });
                } else {
                    allIngredientsAvailable = false;
                    missingIngredients.push(`${ingrediente.nombre} (Needed: ${ingrediente.cantidadNecesaria}, Available: ${stockDisponible})`);
                }
            }
        }

        return { allIngredientsAvailable, missingIngredients };
    };

    return { checkAndUpdateInventory };
};
