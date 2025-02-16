"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-full max-w-4xl shadow-lg bg-white">
        <CardContent className="p-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-center">
            Bienvenido a Kumbre
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Optimiza la gestión de tu inventario de manera eficiente y sin complicaciones.
          </p>

          <div className="mt-6 text-left space-y-4">
            <h2 className="text-2xl font-semibold">¿Cómo empezar?</h2>
            <p className="text-gray-700">
              1️⃣ Revisa el estado de tu inventario y asegúrate de que todo está en orden.  
            </p>
            <p className="text-gray-700">
              2️⃣ Crea una nueva orden para registrar los productos ingresados hoy.  
            </p>
            <p className="text-gray-700">
              3️⃣ Verifica los reportes y mantén el control de tus existencias en tiempo real.  
            </p>
          </div>

          <div className="mt-6 text-left space-y-4">
            <h2 className="text-2xl font-semibold">Funciones principales</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>📦 Registro y seguimiento de inventario.</li>
              <li>📊 Generación de reportes detallados.</li>
              <li>🔄 Sincronización en tiempo real.</li>
              <li>✅ Interfaz intuitiva y fácil de usar.</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              className="px-6 py-3 text-lg font-semibold" 
              onClick={() => router.push("/inventario")}
            >
              📝 Crea aquí tu orden de hoy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
