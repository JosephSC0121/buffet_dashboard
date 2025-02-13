// store/atoms.ts
import { atom } from "jotai";

export const selectedDishesAtom = atom({
  sopa: '',
  sopaCantidad: '',
  arroz1: '',
  arroz1Cantidad: '',
  arroz2: '',
  arroz2Cantidad: '',
  proteina1: '',
  proteina1Cantidad: '',
  proteina2: '',
  proteina2Cantidad: '',
  guarnicion: '',
  guarnicionCantidad: '',
  principio: '',
  principioCantidad: '',
  verdura: '',
  verduraCantidad: '',
});
