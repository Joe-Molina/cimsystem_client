"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

export interface CheckUploadFormData {
  destiny_banck: string;
  origin_banck: string;
  accion: string;
  tipo_pago: string;
  referencia: string;
  monto: number;
  pay_date: string;
}

export interface DebtMonth {
  mes: string;
  divisa: number;
  bs: number;
}

export interface DebtData {
  accion: string;
  totalDivisa: number;
  totalBs: number;
  mesesDeudaMap: DebtMonth[];
}

export const useUploadCheck = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debtData, setDebtData] = useState<DebtData | null>(null);
  const [isLoadingDebt, setIsLoadingDebt] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CheckUploadFormData>({
    defaultValues: {
      destiny_banck: "",
      origin_banck: "",
      accion: "",
      tipo_pago: "pago movil",
      referencia: "",
      monto: 0,
      pay_date: new Date().toISOString().split("T")[0],
    },
  });

  const fetchDebtData = useCallback(async (accion: string) => {
    if (!accion || accion.length < 3) {
      setDebtData(null);
      return;
    }

    setIsLoadingDebt(true);
    try {
      const response = await axios.get<DebtData>(`http://10.10.1.4:3000/cobranza/get/${accion}`);
      setDebtData(response.data);
    } catch (error) {
      console.error("Error fetching debt data:", error);
      setDebtData(null);
      // We don't necessarily want to toast error on every keystroke, 
      // maybe only if it's a specific length or on blur
    } finally {
      setIsLoadingDebt(false);
    }
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const onSubmit = async (data: CheckUploadFormData) => {
    if (!selectedFile) {
      toast.error("Por favor seleccione una imagen del comprobante");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("destiny_banck", data.destiny_banck);
    formData.append("origin_banck", data.origin_banck);
    formData.append("accion", data.accion);
    formData.append("tipo_pago", data.tipo_pago);
    formData.append("referencia", data.referencia);
    formData.append("monto", data.monto.toString());
    formData.append("pay_date", data.pay_date);

    try {
      const response = await axios.post("http://localhost:3002/checks", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Información subida correctamente", {
          description: "El comprobante ha sido guardado en el sistema.",
        });
        reset();
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error("Error uploading check:", error);
      toast.error("Error al subir el comprobante. Por favor intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return {
    selectedFile,
    previewUrl,
    isSubmitting,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    handleFileChange,
    removeSelection,
    setValue,
    watch,
    debtData,
    isLoadingDebt,
    fetchDebtData,
  };
};
