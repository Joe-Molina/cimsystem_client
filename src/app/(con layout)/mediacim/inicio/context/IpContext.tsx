'use client'

import { createContext } from "react";

export type IpContextProps = {
  IpState: string,
  setIp: (ip: string) => void,


};

export const IpContext = createContext<IpContextProps>({} as IpContextProps)