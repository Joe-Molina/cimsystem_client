"use client";

import React, { useRef } from "react";
import { useUploadCheck } from "@/hooks/use-upload-check";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Upload, X, FileText, 
  Image as ImageIcon, 
  Send, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Wallet,
  Copy,
  Loader2,
  ScanText
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UploadCheckPage() {
  const {
    previewUrl,
    isSubmitting,
    register,
    handleSubmit,
    errors,
    handleFileChange,
    removeSelection,
    setValue,
    watch,
    debtData,
    isLoadingDebt,
    fetchDebtData,
    ocrText,
    isProcessingOCR
  } = useUploadCheck();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const tipoPagoValue = watch("tipo_pago");
  const accionValue = watch("accion") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDebtData(accionValue);
    }, 500); // Debounce fetch
    return () => clearTimeout(timer);
  }, [accionValue, fetchDebtData]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
 
  return (
    <div className="w-full p-6 lg:p-10 py-8 min-h-screen">
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="upload-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center min-h-[70vh] p-4"
          >
            <div className="text-center space-y-6 max-w-md w-full">
              <div className="flex justify-center">
                <div className="p-10 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 animate-pulse">
                  <Upload className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Subir Comprobante</h1>
                <p className="text-muted-foreground">
                  Sube una imagen de tu comprobante de pago para procesar la información.
                </p>
              </div>
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <Button 
                size="lg" 
                className="w-full text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={triggerFileInput}
              >
                Subir Comprobante
              </Button>
              
              <div className="text-xs text-muted-foreground pt-4">
                Formatos aceptados: JPG, PNG, WEBP. Tamaño máximo: 5MB.
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-10"
          >
            {/* Left Side: Preview (Sidebar) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="w-full lg:w-[450px] lg:sticky lg:top-24 shrink-0 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none pb-4"
            >
              <Card className="overflow-hidden border-2 shadow-xl rounded-2xl">
                <CardHeader className="bg-muted/50 border-b flex flex-row items-center justify-between py-3">
                  <div>
                    <CardTitle className="text-sm font-medium">Vista Previa</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                    onClick={removeSelection}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 bg-black/5 flex items-center justify-center min-h-[400px] relative">
                  <div className="relative w-full aspect-[3/4] max-h-[70vh]">
                    <Image
                      src={previewUrl}
                      alt="Comprobante preview"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </CardContent>
              </Card>

              {/* OCR Result Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Card className="overflow-hidden border-2 shadow-lg rounded-2xl">
                  <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <ScanText className="w-4 h-4 text-primary" />
                      <CardTitle className="text-sm font-medium">Texto Detectado</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary disabled:opacity-50"
                      onClick={() => {
                        if (ocrText) {
                          navigator.clipboard.writeText(ocrText);
                          toast.success("Texto copiado al portapapeles");
                        }
                      }}
                      disabled={!ocrText || isProcessingOCR}
                      title="Copiar texto"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 bg-background min-h-[150px] relative">
                    {isProcessingOCR ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10 gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-xs text-muted-foreground font-medium animate-pulse">Procesando imagen...</span>
                      </div>
                    ) : (
                      <textarea 
                        className="w-full h-full min-h-[150px] p-4 text-xs font-mono resize-none border-none focus:ring-0 bg-transparent text-muted-foreground focus:text-foreground transition-colors"
                        readOnly
                        value={ocrText || "El texto detectado aparecerá aquí..."}
                        placeholder="El texto detectado aparecerá aquí..."
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Right Side: Form & Debt Information Container */}
            <motion.div 
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex-1 w-full flex flex-col xl:flex-row gap-8 h-full max-h-[calc(100vh-theme(spacing.32))]"
            >
              {/* Form Column */}
              <motion.div 
                layout
                className={`flex flex-col gap-8 transition-all duration-500 ease-in-out ${
                  (isLoadingDebt || debtData || accionValue.length >= 3) 
                    ? "w-full xl:w-1/2" 
                    : "w-full"
                }`}
              >
                <Card className="shadow-xl rounded-2xl border-none ring-1 ring-border h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle>Confirmar Información</CardTitle>
                  </div>
                  <CardDescription>
                    Verifica los datos del comprobante antes de enviarlo.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <CardContent className="space-y-4 flex-1 overflow-y-auto scrollbar-thin p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monto">Monto</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">bs</span>
                      <Input
                        id="monto"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-7 h-11"
                        {...register("monto", { 
                          required: "El monto es requerido", 
                          valueAsNumber: true,
                          min: { value: 0.01, message: "El monto debe ser mayor a 0" }
                        })}
                      />
                    </div>
                    {errors.monto && <p className="text-xs text-destructive">{errors.monto.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo_pago">Tipo de Pago</Label>
                    <Select 
                      onValueChange={(value) => setValue("tipo_pago", value)}
                      defaultValue={tipoPagoValue}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pago movil">Pago Móvil</SelectItem>
                        <SelectItem value="transferencia">Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.tipo_pago && <p className="text-xs text-destructive">{errors.tipo_pago.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="origin_banck">Banco Origen</Label>
                    <Input
                      id="origin_banck"
                      placeholder="Nombre del banco"
                      className="h-11"
                      {...register("origin_banck", { required: "El banco origen es requerido" })}
                    />
                    {errors.origin_banck && <p className="text-xs text-destructive">{errors.origin_banck.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destiny_banck">Banco Destino</Label>
                    <Input
                      id="destiny_banck"
                      placeholder="Nombre del banco"
                      className="h-11"
                      {...register("destiny_banck", { required: "El banco destino es requerido" })}
                    />
                    {errors.destiny_banck && <p className="text-xs text-destructive">{errors.destiny_banck.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accion">Acción</Label>
                  <Input
                    id="accion"
                    placeholder="Número de acción"
                    className="h-11"
                    {...register("accion", { required: "La acción es requerida" })}
                  />
                  {errors.accion && <p className="text-xs text-destructive">{errors.accion.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referencia">Número de Referencia</Label>
                    <Input
                      id="referencia"
                      placeholder="Ej: 12345678"
                      className="h-11"
                      {...register("referencia", { required: "La referencia es requerida" })}
                    />
                    {errors.referencia && <p className="text-xs text-destructive">{errors.referencia.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pay_date">Fecha del Pago</Label>
                    <Input
                      id="pay_date"
                      type="date"
                      className="h-11"
                      {...register("pay_date", { required: "La fecha es requerida" })}
                    />
                    {errors.pay_date && <p className="text-xs text-destructive">{errors.pay_date.message}</p>}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold transition-all group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Enviar Comprobante
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
                </Card>
              </motion.div>

            {/* Debt Information Column */}
            <AnimatePresence>
              {(isLoadingDebt || debtData || accionValue.length >= 3) && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full xl:w-1/2 h-full"
                >
                  <div className="lg:block h-full">
                    {isLoadingDebt ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center p-8 bg-muted/30 rounded-2xl border-2 border-dashed"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                          <p className="text-sm font-medium text-muted-foreground">Consultando deuda...</p>
                        </div>
                      </motion.div>
                    ) : debtData ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-6 h-full flex flex-col"
                        >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                              <DollarSign className="w-12 h-12" />
                            </div>
                            <CardHeader className="pb-2">
                              <CardDescription className="text-primary/70 font-semibold uppercase text-[10px] tracking-wider">Total Divisa</CardDescription>
                              <CardTitle className="text-3xl font-bold">${debtData.totalDivisa.toLocaleString()}</CardTitle>
                            </CardHeader>
                          </Card>

                          <Card className="bg-secondary/5 border-secondary/10 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                              <Wallet className="w-12 h-12" />
                            </div>
                            <CardHeader className="pb-2">
                              <CardDescription className="text-secondary/70 font-semibold uppercase text-[10px] tracking-wider">Total Bolívares</CardDescription>
                              <CardTitle className="text-3xl font-bold">Bs {debtData.totalBs.toLocaleString()}</CardTitle>
                            </CardHeader>
                          </Card>
                        </div>

                        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm flex-1 flex flex-col min-h-0">
                          <CardHeader className="pb-4 border-b shrink-0">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <CardTitle className="text-lg">Desglose de Meses</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="p-0 flex-1 overflow-auto max-h-[500px]">
                            <div className="divide-y divide-border h-full overflow-y-auto scrollbar-thin">
                              {debtData.mesesDeudaMap.map((item, index) => (
                                <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm">
                                      {(() => {
                                        try {
                                          if (!item.mes) return 'Fecha no disponible';
                                          const date = new Date(item.mes);
                                          // Check if date is valid
                                          if (isNaN(date.getTime())) return item.mes || 'Fecha inválida';
                                          return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric', timeZone: 'UTC' });
                                        } catch (e) {
                                          return 'Fecha inválida';
                                        }
                                      })()}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Concepto de Deuda</span>
                                  </div>
                                  <div className="flex flex-col items-end gap-1">
                                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-primary/10 text-primary border border-primary/20">
                                      ${item.divisa.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground">
                                      Bs {item.bs.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ) : accionValue.length >= 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 text-center bg-muted/20 rounded-2xl border-2 border-dashed italic text-muted-foreground text-sm"
                      >
                        No se encontró información para la acción "{accionValue}"
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
