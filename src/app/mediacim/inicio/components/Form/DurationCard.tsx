/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from '../../hooks/useForm'



export default function DurationCard() {
  const { setDuraForm } = useFormContext()

  const handleClick = (e: any) => {
    const number = Number(e.target.value);
    setDuraForm(number * 1000);
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="archivo">Duracion en segundos</Label>
      <Input type="number" onChange={(e) => handleClick(e)} />
    </div>




  )
}
