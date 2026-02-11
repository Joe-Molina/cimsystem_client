"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "@/hooks/use-checks";
import { useVerifyCheck } from "@/hooks/use-verify-check";
import { CheckCircle2, X, Calendar, DollarSign, Building2, ArrowRightLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface VerificationModalProps {
  check: Check | null;
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export function VerificationModal({ check, isOpen, onClose, onVerified }: VerificationModalProps) {
  const [observation, setObservation] = useState("");
  const { verifyCheck, isVerifying } = useVerifyCheck();

  if (!check) return null;

  const handleVerify = async () => {
    try {
      await verifyCheck(check.id, observation);
      setObservation("");
      onVerified();
      onClose();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleClose = () => {
    setObservation("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Verificar Comprobante
          </DialogTitle>
          <DialogDescription>
            Revisa la información y la imagen del comprobante antes de verificar
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left Column: Image */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Imagen del Comprobante</Label>
            {check.image ? (
              <div className="border rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={check.image}
                  alt="Comprobante de pago"
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            ) : (
              <div className="border rounded-lg p-8 text-center text-muted-foreground bg-muted/30">
                No hay imagen disponible
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                    Referencia
                  </Label>
                  <p className="text-lg font-semibold">{check.referencia}</p>
                </div>
                <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
                  {check.tipo_pago}
                </Badge>
              </div>

              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <Label className="text-xs text-muted-foreground">Monto</Label>
                  <p className="text-2xl font-bold text-primary">
                    ${Number(check.monto).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Banco Origen
                  </Label>
                  <p className="text-sm font-medium mt-1">{check.origin_banck}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <ArrowRightLeft className="w-3 h-3" />
                    Banco Destino
                  </Label>
                  <p className="text-sm font-medium mt-1">{check.destiny_banck}</p>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Fecha de Pago
                </Label>
                <p className="text-sm font-medium mt-1">
                  {format(new Date(check.pay_date), "PPP", { locale: es })}
                </p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <Label className="text-xs text-muted-foreground">Acción</Label>
                <p className="text-sm font-mono mt-1">{check.accion}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <Label htmlFor="observation">Observación (Opcional)</Label>
              <Textarea
                id="observation"
                placeholder="Agrega una observación sobre este comprobante..."
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isVerifying}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleVerify} disabled={isVerifying} className="bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {isVerifying ? "Verificando..." : "Verificar Comprobante"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
