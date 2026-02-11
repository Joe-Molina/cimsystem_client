"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useVerifyCheck = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyCheck = async (id: number, observation?: string) => {
    setIsVerifying(true);
    try {
      const response = await axios.patch(`http://10.10.1.4:3002/checks/${id}`, {
        verificacion: true,
        status: "VERIFICADO",
        msj: observation || "",
      });

      toast.success("Comprobante verificado exitosamente");
      return response.data;
    } catch (error) {
      console.error("Error verifying check:", error);
      toast.error("Error al verificar el comprobante");
      throw error;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verifyCheck,
    isVerifying,
  };
};
