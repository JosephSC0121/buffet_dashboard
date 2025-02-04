import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const foodInventory = [
  {
    name: "Pollo Asado",
    category: "Carnes",
    quantity: 20,
    unit: "Porciones",
  },
  {
    name: "Ensalada César",
    category: "Ensaladas",
    quantity: 15,
    unit: "Platos",
  },
  {
    name: "Arroz Blanco",
    category: "Acompañamientos",
    quantity: 30,
    unit: "Tazas",
  },
  {
    name: "Pasta Alfredo",
    category: "Pastas",
    quantity: 10,
    unit: "Platos",
  },
  {
    name: "Tarta de Queso",
    category: "Postres",
    quantity: 8,
    unit: "Rebanadas",
  },
  {
    name: "Jugo de Naranja",
    category: "Bebidas",
    quantity: 25,
    unit: "Vasos",
  },
]

export function AppTable() {
  return (
    <Table>
      <TableCaption>Inventario actual de alimentos para el buffet.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Unidad</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {foodInventory.map((food, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{food.name}</TableCell>
            <TableCell>{food.category}</TableCell>
            <TableCell>{food.quantity}</TableCell>
            <TableCell className="text-right">{food.unit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total de alimentos</TableCell>
          <TableCell className="text-right">{foodInventory.length} tipos</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}