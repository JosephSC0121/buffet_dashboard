"use client";

import { useEffect, useState } from "react";
import { getProteins, getCarbs, getOthers } from "../../lib/directus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jsPDF } from "jspdf";
import { updateItemProtein, updateItemCarbohidratos, updateItemOtros } from "../../lib/directus";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [proteins, setProteins] = useState([]);
    const [carbs, setCarbs] = useState([]);
    const [others, setOthers] = useState([]);

    const [selectedProtein, setSelectedProtein] = useState(null);
    const [selectedCarb, setSelectedCarb] = useState(null);
    const [selectedOther, setSelectedOther] = useState(null);
    const [orderStatus, setOrderStatus] = useState("");

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

    const handleOrder = async () => {
        if (!selectedProtein || !selectedCarb || !selectedOther) {
            setOrderStatus("Please select all items to complete the order.");
            return;
        }

        // Generate PDF
        const doc = new jsPDF();
        doc.text("Resumen de la compra", 10, 10);
        doc.text(`Proteina: ${selectedProtein.nombre}`, 10, 20);
        doc.text(`Carbohidrato: ${selectedCarb.nombre}`, 10, 30);
        doc.text(`Otros: ${selectedOther.nombre}`, 10, 40);

        try {
            if (selectedProtein) {
                await updateItemProtein(selectedProtein.id, selectedProtein.cantidad - 1);
            }
            if (selectedCarb) {
                await updateItemCarbohidratos(selectedCarb.id, selectedCarb.cantidad - 1);
            }
            if (selectedOther) {
                await updateItemOtros(selectedOther.id, selectedOther.cantidad - 1);
            }
            doc.save("order.pdf");
            setOrderStatus("Order created successfully and stock updated.");
        } catch (error) {
            setOrderStatus("Failed to update stock. Please try again.");
        }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-lg font-bold">Proteínas</h1>
                <Select onValueChange={(value) => setSelectedProtein(proteins.find(p => p.nombre === value))}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccionar proteína" />
                    </SelectTrigger>
                    <SelectContent>
                        {proteins.filter((protein) => protein.cantidad > 0).map((protein) => (
                            <SelectItem key={protein.id} value={protein.nombre}>
                                {protein.nombre} - {protein.cantidad}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-2">
                <h1 className="text-lg font-bold">Carbohidratos</h1>
                <Select onValueChange={(value) => setSelectedCarb(carbs.find(c => c.nombre === value))}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccionar carbohidrato" />
                    </SelectTrigger>
                    <SelectContent>
                        {carbs.filter((carb) => carb.cantidad > 0).map((carb) => (
                            <SelectItem key={carb.id} value={carb.nombre}>
                                {carb.nombre} - {carb.cantidad}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col space-y-2">
                <h1 className="text-lg font-bold">Otros</h1>
                <Select onValueChange={(value) => setSelectedOther(others.find(o => o.nombre === value))}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Seleccionar otro" />
                    </SelectTrigger>
                    <SelectContent>
                        {others.filter((other) => other.cantidad > 0).map((other) => (
                            <SelectItem key={other.id} value={other.nombre}>
                                {other.nombre} - {other.cantidad}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={handleOrder}>Create Order</Button>
            <Button onClick={fetchData} className="ml-2">Update Stock</Button>

            {orderStatus && (
                <div className="mt-4 p-2 text-center text-sm">
                    <p>{orderStatus}</p>
                </div>
            )}
        </div>
    );
}
