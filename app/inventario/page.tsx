"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/app-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useFetchOrdersAndRecipes from "@/hooks/use-hour";
import { useState, useEffect } from "react";

type OrderType = {
    recetaNombre: any;
    unidad: any;
    id: number;
    name: string;
    cantidad: number;
};

export default function Home() {
    const [date] = useState(new Date());
    console.log(date)
    const { ordenes, loading, recetaNombres, recipes } = useFetchOrdersAndRecipes(date);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [loading]);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">📅 Inventario del Día</h1>
                    <p className="text-gray-600 text-sm">Aquí puedes ver y gestionar el inventario registrado para el día de hoy.</p>
                </div>
                <span className="text-lg text-gray-500 font-medium">{date.toLocaleDateString()}</span>
            </div>

            {/* Botón para crear inventario */}
            <div className="flex justify-end">
                <AppDialog title="➕ Crear Inventario del Día" data={recipes}>
                </AppDialog>
            </div>

            {/* Alerta si no hay registros */}
            {!isLoading && ordenes.length === 0 && (
                <Alert className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800">
                    <AlertTitle className="font-semibold">⚠️ Sin registros</AlertTitle>
                    <AlertDescription>
                        No hay inventario registrado para el día de hoy. 📌 
                        <span className="font-medium">Haz clic en "Crear Inventario del Día" para registrar uno ahora mismo.</span>
                    </AlertDescription>
                </Alert>
            )}

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <Card key={index} className="shadow-md rounded-lg p-5 bg-gray-50 animate-pulse">
                              <CardHeader>
                                  <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-4"></div>
                              </CardHeader>
                              <CardContent>
                                  <div className="h-4 w-full bg-gray-200 rounded-md mb-3"></div>
                                  <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
                              </CardContent>
                          </Card>
                      ))
                    : ordenes.map((orden: OrderType) => (
                          <Card key={orden.id} className="shadow-md rounded-lg p-5 bg-white border border-gray-200 hover:shadow-lg transition-all">
                              <CardHeader className="flex items-center justify-between">
                                  <CardTitle className="text-lg font-semibold text-gray-800">
                                      📌 {recetaNombres[orden.receta] || "Cargando..."}
                                  </CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-gray-600 text-sm">📦 <span className="font-medium">Cantidad registrada:</span></p>
                                  <p className="text-gray-900 font-bold text-lg">{orden.cantidad} {orden.unidad}</p>
                              </CardContent>
                          </Card>
                      ))}
            </div>

            {/* Botón de actualización */}
            <div className="flex justify-center">
                <Button 
                    className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 transition-all"
                    onClick={handleRefresh}
                >
                    🔄 Recargar datos del inventario
                </Button>
            </div>
        </div>
    );
}
