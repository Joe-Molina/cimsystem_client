"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const cobranza: { title: string; href: string; description: string }[] = [
  {
    title: "Cobranza",
    href: "/cobranza",
    description:
      "Verifica deudas y manda mensajes automaticos a los socios con deudas",
  },
    {
    title: "Primeros Contactos",
    href: "/cobranza/contactos",
    description:
      "Selecciona tu nombre y gestiona los primeros contactos que hiciste con los deudores",
  },
  {
    title: "Subir Comprobante",
    href: "/checks/upload",
    description:
      "Sube un comprobante de pago para procesar la información.",
  }
]

const media: { title: string; href: string; description: string }[] = [
  {
    title: "MediaCIM",
    href: "/mediacim",
    description:
      "Gestiona la publicidad del club desde un solo lugar.",
  },
  {
    title: "Cumpleaños",
    href: "/cumples",
    description:
      "Ve los cumples cercanos de los socios.",
  }
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Cobranza</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid gap-3 p-4 md:w-[300px] lg:w-[300px]">
              {cobranza.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>MediosCIM</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[300px]  lg:w-[300px] ">
              {media.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/informacion/socios" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Info Socios
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
