'use client'
type IpAction =
  | { type: "setIp", payload: { ip: string } }


export const IpReducer = (state: string, action: IpAction): string => {

  switch (action.type) {

    case "setIp":
      // const { ip } = action.payload;
      return action.payload.ip

    default:
      return state;
  }

}