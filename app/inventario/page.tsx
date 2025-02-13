"use client";
import { AppDialog } from "@/components/app-dialog";
import { getRecipes } from "@/lib/directus";
import { useEffect, useState } from "react";

export default function Home() {
    const [date] = useState(new Date());
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesData = await getRecipes();
            setRecipes(recipesData);
        };
        fetchRecipes();
    }, []);
    console.log(recipes);
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-lg font-bold">Inventario del Dia {date.toLocaleDateString()}</h1>
            <AppDialog title="Crear Inventario del dia"  data={recipes}/>   
        </div>
    );
}
