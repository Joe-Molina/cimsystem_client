'use client'

import { useReducer } from "react";
import { IpContext } from "./IpContext";
import { IpReducer } from "./IpReducer";



interface props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: string = 'http://mediacim1:3002'

export const IpProvider = ({ children }: props) => {

  const [IpState, dispatch] = useReducer(IpReducer, INITIAL_STATE)


  const setIp = (ip: string) => {
    dispatch({ type: 'setIp', payload: { ip } })
  }
  return (
    <IpContext.Provider value={{
      IpState,
      setIp
    }}>
      {children}
    </IpContext.Provider>
  )
}