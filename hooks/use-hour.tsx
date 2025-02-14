import { useState, useEffect } from "react";
import { getRecipes, getOrdenDiaByDate, getRecetaById } from "@/lib/directus";

const useFetchOrdersAndRecipes = (date) => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [ordenes, setOrdenes] = useState([]);
    const [recetaNombres, setRecetaNombres] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const todayStr = date.toISOString().split("T")[0];
                const recipesData = await getRecipes();
                const ordenesData = await getOrdenDiaByDate(todayStr);
                
                const recetaPromises = ordenesData.map(async (orden) => {
                    const receta = await getRecetaById(orden.receta);
                    return { id: orden.receta, nombre: receta[0]?.nombre || "Desconocido" };
                });
                
                const recetasInfo = await Promise.all(recetaPromises);
                const recetasMap = recetasInfo.reduce((acc, receta) => {
                    acc[receta.id] = receta.nombre;
                    return acc;
                }, {});

                setRecipes(recipesData);
                setOrdenes(ordenesData);
                setRecetaNombres(recetasMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [date]);

    return { loading, recipes, ordenes, recetaNombres };
};

export default useFetchOrdersAndRecipes;
