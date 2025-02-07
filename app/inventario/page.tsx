"use client";

import { useEffect, useState } from "react";
import { getProteins, getCarbs, getOthers } from "../../lib/directus";
import { AppTable } from "@/components/app-table";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [proteins, setProteins] = useState([]);
    const [carbs, setCarbs] = useState([]);
    const [others, setOthers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const proteinsData = await getProteins();
        const carbsData = await getCarbs();
        const othersData = await getOthers();
        setProteins(proteinsData);
        setCarbs(carbsData);
        setOthers(othersData);
    };

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-lg font-bold">Inventario</h1>
            <AppTable title="Proteínas" data={proteins} />
            <AppTable title="Carbohidratos" data={carbs} />
            <AppTable title="Otros" data={others} />
            <Button onClick={fetchData} className="mt-4">Actualizar Inventario</Button>
        </div>
    );
}
