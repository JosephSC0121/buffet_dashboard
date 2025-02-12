"use client";

import { useEffect, useState } from "react";
import { getProteins, getCarbs, getOthers } from "../lib/directus";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function AppTable({ title, data }) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <Table>
                <TableCaption>Inventario actual de {title.toLowerCase()}.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Nombre</TableHead>
                        <TableHead>Cantidad</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.nombre}</TableCell>
                            <TableCell>{item.cantidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}>Total de {title.toLowerCase()}</TableCell>
                        <TableCell className="text-right">{data.length} tipos</TableCell>
                    </TableRow>
                  
                </TableFooter>
            </Table>
        </div>
    );
}

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
