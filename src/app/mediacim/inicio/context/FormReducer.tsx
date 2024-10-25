'use client'

import { FormState, Post } from "../interfaces/interfaces";

type FormAction =
  | { type: "emptyPost", payload: { emptyPost: Post } }
  | { type: "addTypePost", payload: { type: string } }
  | { type: "addType2Post", payload: { type: string } }
  | { type: "addIdPost", payload: { id: number } }
  | { type: "addNamePost", payload: { name: string } }
  | { type: "addPositionPost", payload: { position: number } }
  | { type: "addDurationPost", payload: { duration: number } }
  | { type: "addStartDatePost", payload: { fecha_inicio: Date } }
  | { type: "addEndDatePost", payload: { Fecha_Fin: Date } }


export const formReducer = (state: FormState, action: FormAction): FormState => {

  switch (action.type) {
    case "emptyPost":
      return {
        ...state,
        Form: action.payload.emptyPost
      }

    case "addTypePost":
      return {
        ...state,
        Form: { ...state.Form, type: action.payload.type }
      }

    case "addType2Post":
      return {
        ...state,
        Form: { ...state.Form, type: action.payload.type }
      }

    case "addIdPost":
      return {
        ...state,
        Form: { ...state.Form, id: action.payload.id }
      }

    case "addNamePost":
      return {
        ...state,
        Form: { ...state.Form, name: action.payload.name }
      }

    case "addPositionPost":
      return {
        ...state,
        Form: { ...state.Form, position: action.payload.position }
      }

    case "addStartDatePost":
      return {
        ...state,
        Form: { ...state.Form, fecha_inicio: action.payload.fecha_inicio }
      }

    case "addEndDatePost":
      return {
        ...state,
        Form: { ...state.Form, Fecha_Fin: action.payload.Fecha_Fin }
      }

    case "addDurationPost":
      return {
        ...state,
        Form: { ...state.Form, duration: action.payload.duration }
      }

    default:
      return state;
  }

}


