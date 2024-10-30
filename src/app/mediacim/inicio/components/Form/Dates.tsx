/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { useFormContext } from '../../hooks/useForm'
import Image from 'next/image'
import { FormState } from '../../interfaces/interfaces'

interface props {
  setDates: any
  start: boolean
  state: FormState
}

const SetDate = ({ setDates, start, state }: props) => {

  const ActualDateStart = state.Form.fecha_inicio.toLocaleDateString()
  const ActualDateEnd = state.Form.Fecha_Fin.toLocaleDateString()

  return (
    <>
      <Popover>
        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='  border  w-7 h-7 flex justify-center items-center rounded-sm '><Image src={`/iconos/${start ? "up.svg" : "down.svg"}`} alt='' width={20} height={20} /></div></PopoverTrigger>{start ? ActualDateStart : ActualDateEnd}</div>
        <PopoverContent>
          <Calendar
            mode="single"
            onSelect={setDates}
            className="rounded-md flex justify-center border"
          />
        </PopoverContent>
      </Popover>
    </>

  )
}

export default function Dates() {
  const { setStartDateForm, setEndDateForm, formState } = useFormContext()


  return (
    <div className='flex justify-around'>

      <SetDate setDates={setStartDateForm} start={true} state={formState} />
      <SetDate setDates={setEndDateForm} start={false} state={formState} />


    </div>
  )
}
