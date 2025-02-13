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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AppDialogProps } from "@/types/ApiResponses";
import { useAtom } from "jotai";
import { AppDialogIngredients } from "./app-resumen";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AppDialog({ title, data }: AppDialogProps) {
  const [selectedItems, setSelectedItems] = useAtom(selectedDishesAtom);

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

  const handleSelectChange = (type: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleQuantityChange = (type: string, value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [`${type}Cantidad`]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>🍽️ Platos del Día</DialogTitle>
          <DialogDescription>Selecciona los platos y la cantidad de porciones.</DialogDescription>
        </DialogHeader>

        <div className="space-y-1">
          {categories.map(({ label, key, tipo }) => {
            const filteredItems = data.filter((item) => item.tipo === tipo);
            return (
              <div key={key} className="flex flex-col gap-2">
                <Label htmlFor={key} className="text-sm font-medium text-gray-700">
                  {label}
                </Label>
                <div className="flex gap-3">
                  <Select defaultValue={selectedItems[key] || ""} onValueChange={(value) => handleSelectChange(key, value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredItems.map((item) => (
                        <SelectItem key={item.id} value={item.nombre}>
                          {item.nombre} {item.unidad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Cant."
                    min="1"
                    className="w-20 text-center"
                    value={selectedItems[`${key}Cantidad`] || ""}
                    onChange={(e) => handleQuantityChange(key, e.target.value)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex justify-between mt-4">
          <AppDialogIngredients title="📜 Resumen" data={data} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
