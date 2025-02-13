"use client";
import { Calendar, Home, Inbox, Settings, Users, FileText, ClipboardList } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Para manejar clases condicionales

const items = [
  { title: "Inicio", url: "/inicio", icon: Home },
  { title: "Inventario General", url: "/inventario_general", icon: ClipboardList },
  { title: "Inventario", url: "/inventario", icon: Inbox },
  { title: "Órdenes", url: "/orden", icon: FileText },
];



export function AppSidebar() {
  const pathname = usePathname(); // Detecta la URL actual para marcar el activo

  return (
    <Sidebar className="h-screen w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold px-4 py-3">Kumbre</SidebarGroupLabel>
          <Separator className="my-4 mx-1" /> {/* Divider entre secciones */}
          <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
                            isActive
                              ? "bg-muted font-medium"
                              : "hover:bg-muted"
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>

              <Separator className="my-4 mx-1" /> {/* Divider entre secciones */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
