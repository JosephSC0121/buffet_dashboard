"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getOrdenDiaByDate, getRecetaById, updateOrdenById } from "../../lib/directus";

type OrderType = {
    recetaNombre: string;
    unidad: string;
    id: number;
    name: string;
    cantidad: number;
};

export default function OrdenesDelComensal() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<OrderType[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const ordersData = await getOrdenDiaByDate(today);
            const ordersWithReceta = await Promise.all(
                ordersData.map(async (order) => {
                    if (order.receta) {
                        try {
                            const recetaData = await getRecetaById(order.receta);
                            return { ...order, recetaNombre: recetaData[0]?.nombre || "Receta desconocida" };
                        } catch (error) {
                            return { ...order, recetaNombre: "Receta no disponible" };
                        }
                    }
                    return { ...order, recetaNombre: "Receta no especificada" };
                })
            );

            // Filtramos órdenes con cantidad mayor a 0 antes de almacenarlas en el estado
            setOrders(ordersWithReceta.filter(order => order.cantidad > 0));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleCheckboxChange = (order: OrderType) => {
        setSelectedOrders((prev) =>
            prev.includes(order) ? prev.filter((o) => o !== order) : [...prev, order]
        );
    };

    const handleGeneratePDF = async () => {
        if (selectedOrders.length === 0) {
            toast({ title: "Error", description: "Selecciona al menos una orden para generar el PDF." });
            return;
        }

        const doc = new jsPDF({ unit: "mm", format: "a4" });
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("Resumen de Órdenes del Comensal", 10, 10);
        doc.setFont("helvetica", "normal");

        for (const [index, order] of selectedOrders.entries()) {
            doc.text(`Orden ${index + 1}: ${order.recetaNombre} - ${order.cantidad} ${order.unidad}`, 10, 20 + index * 10);
            const newCantidad = Math.max(order.cantidad - 1, 0);
            await updateOrdenById(order.id, { cantidad: newCantidad.toString() });
        }

        doc.save("ordenes.pdf");
        toast({ title: "Éxito", description: "PDF generado y stock actualizado." });

        setTimeout(() => {
            fetchOrders();
        }, 5000);
    };

    return (
        <div className="p-6 min-h-screen bg-white text-black">
            <Card className="p-6 w-full max-w-lg shadow-md border rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-2">Gestión de Órdenes del Comensal</h2>
                <p className="text-gray-600 mb-4">
                    Esta pantalla te permite administrar y generar órdenes para los comensales. 
                    Selecciona las órdenes que deseas procesar y luego genera un resumen en PDF.
                </p>
                <div className="space-y-3">
                    {orders.length === 0 ? (
                        <p className="text-gray-500">No hay órdenes disponibles.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="flex items-center space-x-3 p-3 border rounded-md">
                                <Checkbox onCheckedChange={() => handleCheckboxChange(order)} />
                                <span className="font-medium text-gray-800">
                                    {order.recetaNombre} - {order.cantidad} {order.unidad}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </Card>
            <div className="flex justify-center">
                <Button onClick={handleGeneratePDF} className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">
                    Generar Resumen en PDF
                </Button>
            </div>
        </div>
    );
}
