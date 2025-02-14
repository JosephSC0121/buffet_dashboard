// store/atoms.ts
import { atom } from "jotai";

export const selectedDishesAtom = atom({
  sopa: '',
  sopaCantidad: '',
  receta_sopa_id: '',
  arroz1: '',
  arroz1Cantidad: '',
  receta_arroz1_id: '',
  arroz2: '',
  arroz2Cantidad: '',
  receta_arroz2_id: '',
  proteina1: '',
  proteina1Cantidad: '',
  receta_proteina1_id: '',
  proteina2: '',
  proteina2Cantidad: '',
  receta_proteina2_id: '',
  guarnicion: '',
  guarnicionCantidad: '',
  receta_guarnicion_id: '',
  principio: '',
  principioCantidad: '',
  receta_principio_id: '',
  verdura: '',
  verduraCantidad: '',
  receta_verdura_id: '',
});

export const ingredientsAtom = atom<{ [key: string]: { nombre: string; cantidad: number; unidad: string }[] }>({});
