'use client'

import { useReducer } from "react";
import { FormState, Post } from "../interfaces/interfaces";
import { FormContext } from "./FormContext";
import { formReducer } from "./FormReducer";

interface props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: FormState = {
  Form: {
    id: 0,
    name: "",
    type: "img",
    position: 0,
    duration: 0,
    fecha_inicio: new Date,
    Fecha_Fin: new Date,
  }
}


export const FormProvider = ({ children }: props) => {

  const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE)

  const setEmptyForm = (emptyPost: Post) => {
    dispatch({ type: 'emptyPost', payload: { emptyPost } })
  }

  const setTypeForm = (type: string) => {
    dispatch({ type: 'addTypePost', payload: { type } })
  }

  const setIdForm = (id: number) => {
    dispatch({ type: 'addIdPost', payload: { id } })
  }

  const setNameForm = (name: string) => {
    dispatch({ type: 'addNamePost', payload: { name } })
  }

  const setDuraForm = (duration: number) => {
    dispatch({ type: 'addDurationPost', payload: { duration } })
  }

  const setStartDateForm = (fecha_inicio: Date) => {
    dispatch({ type: 'addStartDatePost', payload: { fecha_inicio } })
  }

  const setEndDateForm = (Fecha_Fin: Date) => {
    dispatch({ type: 'addEndDatePost', payload: { Fecha_Fin } })
  }

  const setPositionForm = (position: number) => {
    dispatch({ type: 'addPositionPost', payload: { position } })
  }

  return (
    <FormContext.Provider value={{
      formState,
      setEmptyForm,
      setDuraForm,
      setTypeForm,
      setIdForm,
      setNameForm,
      setStartDateForm,
      setEndDateForm,
      setPositionForm,
    }}>
      {children}
    </FormContext.Provider>
  )
}