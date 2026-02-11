"use client";

import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface Check {
  id: number;
  destiny_banck: string;
  origin_banck: string;
  accion: string;
  tipo_pago: string;
  referencia: string;
  monto: number;
  pay_date: string;
  image?: string; // Assuming the API returns the image URL or filename
  verificacion: boolean; // Assuming the API returns a verified status
  createdAt: string;
}

export const useChecks = (date?: Date) => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChecks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch all checks. In a real app, you might want to filter by date in the query params.
      // e.g., http://10.10.1.4:3002/checks?date=2024-01-01
      const response = await axios.get<Check[]>("http://10.10.1.4:3002/checks");
      
      let data = response.data;
      
      data = data.map((check) => {
        return {
          ...check,
          image: "http://10.10.1.4:3002/checks/image/" + check.image,
        };
      });

      // Filter by date client-side if a date is provided
      if (date) {
        const dateString = date.toISOString().split("T")[0];
        data = data.filter((check) => check.pay_date.startsWith(dateString));
      }

      setChecks(data);
    } catch (err) {
      console.error("Error fetching checks:", err);
      setError("Error al cargar los comprobantes");
      toast.error("Error al cargar los comprobantes");
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchChecks();
  }, [fetchChecks]);

  return {
    checks,
    isLoading,
    error,
    refetch: fetchChecks,
  };
};
