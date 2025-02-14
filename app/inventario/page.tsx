"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppDialog } from "@/components/app-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useFetchOrdersAndRecipes from "@/hooks/use-hour";
import { useState } from "react";

export default function Home() {
    const [date] = useState(new Date());
    const { ordenes, loading, recetaNombres, recipes } = useFetchOrdersAndRecipes(date);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">📅 Inventario del Día</h1>
                <span className="text-lg text-gray-600">{date.toLocaleDateString()}</span>
            </div>

            <div className="flex justify-end">
                <AppDialog title="Crear Inventario del día" data={recipes} />
            </div>

            {ordenes.length === 0 && !loading && (
                <Alert>
                    <AlertTitle>⚠️ Sin registros</AlertTitle>
                    <AlertDescription>No hay inventario registrado para el día de hoy.</AlertDescription>
                </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                          <Card key={index} className="shadow-lg rounded-lg p-4">
                              <CardHeader>
                                  <Skeleton className="h-6 w-3/4 mb-2" />
                              </CardHeader>
                              <CardContent>
                                  <Skeleton className="h-4 w-1/2 mb-1" />
                                  <Skeleton className="h-4 w-1/3" />
                              </CardContent>
                          </Card>
                      ))
                    : ordenes.map((orden) => (
                          <Card key={orden.id} className="shadow-lg rounded-lg p-4">
                              <CardHeader>
                                  <CardTitle className="text-lg font-semibold">{recetaNombres[orden.receta] || "Cargando..."}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-gray-700 font-medium">Cantidad: {orden.cantidad} {orden.unidad}</p>
                              </CardContent>
                          </Card>
                      ))}
            </div>
            <Button className="w-full">🔄 Actualizar Inventario</Button>
        </div>
    );
}
