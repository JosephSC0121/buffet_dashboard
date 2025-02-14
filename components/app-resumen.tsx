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
import { createOrdenDia } from "@/lib/directus";
import { useInventoryCheck } from "@/hooks/use-inventory_check"; // Import the hook

export function AppDialogIngredients({ title, data }: AppDialogProps) {
    const [selectedItems] = useAtom(selectedDishesAtom);

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



      const { checkAndUpdateInventory } = useInventoryCheck();
      
      const saveMenu = async () => {
          const orders = categories.map(category => {  
              const selectedDish = selectedItems[category.key];
              const quantity = selectedItems[`${category.key}Cantidad`] || 1;
              const receta_id = selectedItems[`receta_${category.key}_id`];
              return selectedDish ? { cantidad: quantity, unidad: "porciones", receta: receta_id } : null;
          }).filter(order => order !== null);
      
          try {
              const { allIngredientsAvailable, missingIngredients } = await checkAndUpdateInventory(orders);
      
              if (allIngredientsAvailable) {
                  await createOrdenDia(orders);
                  alert("✅ Menú guardado exitosamente y stock actualizado");
              } else {
                  alert(`❌ No hay suficiente stock para los siguientes ingredientes:\n${missingIngredients.join("\n")}`);
              }
          } catch (error) {
              console.error("Error al guardar el menú", error);
              alert("❌ Hubo un error al guardar el menú");
          }
      };
      

    const ingredientsList = categories.map((category, index) => {
        const selectedDish = selectedItems[category.key];
        const quantityMultiplier = selectedItems[`${category.key}Cantidad`] || 1;
        
        const ingredientes = data.find(item => item.tipo === category.tipo && item.nombre === selectedDish)?.ingredientes || [];

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

                <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">\ud83d\udcdc Resumen del Menú</h3>
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

                <Accordion type="single" collapsible className="w-full mt-4">
                    {ingredientsList}
                </Accordion>

                <DialogFooter>
                    <Button type="submit" onClick={saveMenu}>Guardar el menú del día</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
