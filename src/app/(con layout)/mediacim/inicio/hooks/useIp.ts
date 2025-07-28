import { useContext } from "react";
import { IpContext } from "../context/IpContext";

export const useIpContext = () => {
  const {
    IpState,
    setIp
  } = useContext(IpContext);

  return {
    IpState,
    setIp
  };
};
