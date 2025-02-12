"use client";
import { AppDialog } from "@/components/app-dialog";
import { useState } from "react";

export default function Home() {
    const [date, setDate] = useState(new Date());
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-lg font-bold">Inventario del Dia {date.toLocaleDateString()}</h1>
            <AppDialog title="Crear Inventario del dia" />   
        </div>
    );
}
