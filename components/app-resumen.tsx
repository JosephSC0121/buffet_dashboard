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
import { AppDialogProps } from "@/types/ApiResponses";
import { useAtom } from "jotai";
import { AppAccordion } from "./app-accordion";
import { Accordion } from "@/components/ui/accordion";

export function AppDialogIngredients({ title, data }: AppDialogProps) {
    const [selectedItems] = useAtom(selectedDishesAtom);

    const categories = [
        { label: "🥣 Sopa", key: "sopa", tipo: "sopa" },
        { label: "🍚 Arroz 1", key: "arroz1", tipo: "arroces" },
        { label: "🍛 Arroz 2", key: "arroz2", tipo: "arroces" },
        { label: "🍗 Proteína 1", key: "proteina1", tipo: "proteina" },
        { label: "🥩 Proteína 2", key: "proteina2", tipo: "proteina" },
        { label: "🍟 Guarnición", key: "guarnicion", tipo: "guarnicion" },
        { label: "🍠 Principios", key: "principio", tipo: "principio" },
        { label: "🥦 Verdura Salteada", key: "verdura", tipo: "verdura" },
    ];

    const ingredientsList = categories.map((category, index) => {
        const ingredientes = data.find(item =>
            item.tipo === category.tipo && item.nombre === selectedItems[category.key]
        )?.ingredientes || [];

        return (
            <AppAccordion 
                key={category.key} 
                title={`Ingredientes de ${category.label}`} 
                data={ingredientes} 
                value={`item-${index + 1}`} 
            />
        );
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">{title}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>🍽️ Ingredientes del menú del día</DialogTitle>
                    <DialogDescription>
                        Aquí puedes revisar los ingredientes de los platos seleccionados.
                    </DialogDescription>
                </DialogHeader>

                {/* 📌 Resumen del Menú Seleccionado */}
                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">📜 Resumen del Menú</h3>
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
                </div>

                {/* 📌 Ingredientes */}
                <Accordion type="single" collapsible className="w-full mt-4">
                    {ingredientsList}
                </Accordion>

                <DialogFooter>
                    <Button type="submit">Guardar el menú del día</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
