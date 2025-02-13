export interface AppTableProps {
    title: string;
    data: {
        id: string | number;
        nombre: string;
        unidad: string;
        cantidad_disponible: number;
        precio: number;
    }[];
}

export interface AppDialogProps {
    title: string;
    data: {
        id: number;
        nombre: string;
        ingredientes: string[];
        tipo: string;
        unidad: string;
    }[];
}