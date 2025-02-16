"use client";

import { useEffect, useState } from "react";
import { getIngredients } from "../../lib/directus";
import { AppTable } from "@/components/app-table";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Ingredient = {
    id: number;
    nombre: string;
    cantidad: number;
    unidad: string;
};

export default function Home() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const ingredientsData = await getIngredients();
        setIngredients(ingredientsData as Ingredient[]);
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Card className="shadow-md rounded-2xl p-6 bg-white">
                <h1 className="text-2xl font-semibold flex items-center gap-2">
                    📦 Inventario de Ingredientes
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                    Aquí puedes ver y gestionar la lista de ingredientes disponibles en el inventario. Recarga para obtener la información más reciente.
                </p>
                <CardContent className="mt-4">
                    <AppTable title="Ingredientes" data={ingredients as any} />
                    <Button 
                        onClick={fetchData} 
                        className={`mt-4 flex items-center gap-2 px-4 py-2 text-lg transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={loading}
                    >
                        {loading ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />} 
                        {loading ? "Actualizando..." : "Actualizar Inventario"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
