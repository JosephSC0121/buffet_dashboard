"use client";

import { useEffect, useState } from "react";
import { getIngredients } from "../../lib/directus";
import { AppTable } from "@/components/app-table";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Home() {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const ingredientsData = await getIngredients();
        setIngredients(ingredientsData);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold">📦 Inventario de Ingredientes</h1>
            <AppTable title="Ingredientes" data={ingredients} />
            <Button onClick={fetchData} className="mt-4 flex items-center gap-2">
                <RefreshCw size={18} /> Actualizar Inventario
            </Button>
        </div>
    );
}
