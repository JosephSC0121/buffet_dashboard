import { useState } from "react";
import { useAtom } from "jotai";
import { selectedDishesAtom } from "@/app/store/atom";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import { createOrdenDia } from "@/lib/directus";
import { useInventoryCheck } from "@/hooks/use-inventory_check";
import { AppAccordion } from "./app-accordion";
import { AppDialogProps } from "@/types/ApiResponses";

export function AppDialogIngredients({ title, data }: AppDialogProps) {
    const [selectedItems] = useAtom(selectedDishesAtom);
    const { checkAndUpdateInventory } = useInventoryCheck();
    const { toast } = useToast(); // Hook de notificación
    const [open, setOpen] = useState(false); // Control de apertura del diálogo

    const categories = [
        { label: "🥣 Sopa", key: "sopa", tipo: "sopa" },
        { label: "🍚 Arroz 1", key: "arroz1", tipo: "arroces" },
        { label: "🍛 Arroz 2", key: "arroz2", tipo: "arroces" },
        { label: "🍗 Proteína 1", key: "proteina1", tipo: "proteina" },
        { label: "🥩 Proteína 2", key: "proteina2", tipo: "proteina" },
        { label: "🍟 Guarnición", key: "guarnicion", tipo: "guarnicion" },
        { label: "🍠 Principio", key: "principio", tipo: "principio" },
        { label: "🥦 Verdura Salteada", key: "verdura", tipo: "verdura" },
    ];

    const saveMenu = async () => {
        const orders = categories
            .map(category => {
                const selectedDish = selectedItems[category.key];
                const quantity = selectedItems[`${category.key}Cantidad`] || 1;
                const receta_id = selectedItems[`receta_${category.key}_id`];
                return selectedDish ? { cantidad: quantity, unidad: "porciones", receta: receta_id } : null;
            })
            .filter(order => order !== null);

        try {
            const { allIngredientsAvailable, missingIngredients } = await checkAndUpdateInventory(orders);

            if (allIngredientsAvailable) {
                await createOrdenDia(orders);
                toast({ title: "✅ Menú guardado", description: "El menú del día ha sido guardado exitosamente." });
                setOpen(false); // Cierra el diálogo
            } else {
                toast({
                    title: "❌ Stock insuficiente",
                    description: `Faltan ingredientes: ${missingIngredients.join(", ")}`,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error al guardar el menú", error);
            toast({ title: "❌ Error", description: "Hubo un problema al guardar el menú.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="px-4 py-2 font-medium shadow-md">
                    {title}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[75vh] overflow-y-auto rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">🍽️ Ingredientes del Menú</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        Revisa los ingredientes de los platos seleccionados antes de confirmar el menú.
                    </DialogDescription>
                </DialogHeader>

                {/* Resumen del Menú */}
                <Card className="bg-gray-50 shadow-sm rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">📜 Resumen del Menú</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {categories.map(category => (
                            <li key={category.key}>
                                <span className="font-medium">{category.label}:</span>
                                {selectedItems[category.key] ? (
                                    <span className="text-gray-900"> {selectedItems[category.key]}</span>
                                ) : (
                                    <span className="text-gray-500"> No seleccionado</span>
                                )}
                                {selectedItems[`${category.key}Cantidad`] && (
                                    <span className="text-gray-700"> ({selectedItems[`${category.key}Cantidad`]} porciones)</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Ingredientes Detallados */}
                <Accordion type="single" collapsible className="w-full mt-4">
                    {categories.map((category, index) => {
                        const selectedDish = selectedItems[category.key];
                        const quantityMultiplier = selectedItems[`${category.key}Cantidad`] || 1;
                        const ingredientes =
                            data.find(item => item.tipo === category.tipo && item.nombre === selectedDish)?.ingredientes || [];

                        const formattedIngredients = ingredientes.map(ing => {
                            const [nombre, cantidad, unidad] = ing.split("_");
                            const adjustedCantidad = parseFloat(cantidad) * quantityMultiplier;
                            return `${nombre} ${adjustedCantidad} ${unidad}`;
                        });

                        return (
                            <AppAccordion
                                key={category.key}
                                title={`Ingredientes de ${category.label}`}
                                data={formattedIngredients}
                                value={`item-${index + 1}`}
                            />
                        );
                    })}
                </Accordion>

                {/* Botón de Guardar */}
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={saveMenu}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                        Guardar el Menú del Día
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
