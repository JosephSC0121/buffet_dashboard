"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppTableProps } from "@/types/ApiResponses";


export function AppTable({ title, data }: AppTableProps) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <Table>
                <TableCaption>Inventario actual de {title.toLowerCase()}.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Nombre</TableHead>
                        <TableHead>Cantidad Disponible</TableHead>
                        <TableHead>Unidad</TableHead>
                        <TableHead>Precio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.nombre}</TableCell>
                            <TableCell>{item.cantidad_disponible}</TableCell>
                            <TableCell>{item.unidad}</TableCell>
                            <TableCell>{item.precio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total de {title.toLowerCase()}</TableCell>
                        <TableCell className="text-right">{data.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

