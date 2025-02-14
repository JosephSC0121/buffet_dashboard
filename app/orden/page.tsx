"use client";

import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getOrdenDiaByDate, updateOrdenById } from "../../lib/directus";

export default function PDFGenerator() {
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const data = await getOrdenDiaByDate(today);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleCheckboxChange = (order) => {
        setSelectedOrders((prev) =>
            prev.includes(order) ? prev.filter((o) => o !== order) : [...prev, order]
        );
    };

    const handleGeneratePDF = async () => {
        if (selectedOrders.length === 0) {
            setOrderStatus("Por favor selecciona al menos una orden para generar el PDF.");
            return;
        }

        const doc = new jsPDF({ unit: "mm", format: "a4" });
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("Resumen de la Compra", 10, 10);
        doc.setFont("helvetica", "normal");
        
        for (const [index, order] of selectedOrders.entries()) {
            doc.text(`Orden ${index + 1}: ${order.cantidad} ${order.unidad}`, 10, 20 + index * 10);
            const newCantidad = Math.max(parseInt(order.cantidad) - 1, 0);
            await updateOrdenById(order.id, { cantidad: newCantidad.toString() });
        }
        
        doc.save("ordenes.pdf");
        setOrderStatus("PDF generado con éxito y stock actualizado.");
        
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    };

    return (
        <div className="p-6 space-y-6 min-h-screen flex flex-col items-center bg-white text-black">
            <Card className="p-6 w-full max-w-lg shadow-md border rounded-lg bg-white">
                <h2 className="text-xl font-semibold mb-4">Órdenes del Día</h2>
                <div className="space-y-3">
                    {orders.length === 0 ? (
                        <p>No hay órdenes disponibles.</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="flex items-center space-x-3 p-2 border rounded-md">
                                <Checkbox onCheckedChange={() => handleCheckboxChange(order)} />
                                <span className="font-medium">{order.cantidad} {order.unidad}</span>
                            </div>
                        ))
                    )}
                </div>
            </Card>
            <Button onClick={handleGeneratePDF} className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">
                Generar PDF
            </Button>
            {orderStatus && (
                <div className="mt-4 p-3 text-center text-sm bg-gray-200 text-black border border-gray-400 rounded-md w-full max-w-lg">
                    <p>{orderStatus}</p>
                </div>
            )}
        </div>
    );
}