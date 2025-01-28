'use client'
import { useState } from "react"

interface menu {
  title: string
  subtitle: string
}

export const useMenu = () => {

  const [menu, setMenu] = useState<menu>({ title: "", subtitle: "" })

  return { menu, setMenu }

}