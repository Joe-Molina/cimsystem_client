"use client";

import React, { useState } from "react";
import { useChecks } from "@/hooks/use-checks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Plus, CheckCircle2, XCircle, Search, RefreshCw, ExternalLink } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { checks, isLoading, refetch } = useChecks(selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Create date at noon to avoid timezone issues with pure dates
      const date = new Date(dateValue + "T12:00:00");
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined);
    }
  };

  const verifiedChecks = checks.filter((check) => check.verificacion);
  const unverifiedChecks = checks.filter((check) => !check.verificacion);

  return (
    <div className="w-full flex flex-col h-screen max-h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="px-6 py-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Comprobantes</h1>
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
            <Calendar className="w-4 h-4 text-muted-foreground ml-2" />
            <input
              type="date"
              className="bg-transparent border-none text-sm focus:ring-0 p-1 outline-none"
              value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
              onChange={handleDateChange}
            />
          </div>
          <Button variant="ghost" size="icon" onClick={refetch} className="hover:animate-spin">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <Link href="/checks/upload">
          <Button className="gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Subir Comprobante
          </Button>
        </Link>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Unverified */}
        <div className="flex-1 border-r flex flex-col min-w-0 bg-muted/10">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-yellow-500/10 rounded-full">
                <XCircle className="w-4 h-4 text-yellow-600" />
              </div>
              <h2 className="font-semibold">Por Verificar</h2>
              <Badge variant="secondary" className="ml-2">{unverifiedChecks.length}</Badge>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {isLoading ? (
              <ChecksSkeleton />
            ) : unverifiedChecks.length > 0 ? (
              unverifiedChecks.map((check) => (
                <CheckCard key={check.id} check={check} />
              ))
            ) : (
              <EmptyState message="No hay comprobantes pendientes" />
            )}
          </div>
        </div>

        {/* Right Column: Verified */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          <div className="p-4 border-b bg-muted/30 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
             <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-500/10 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="font-semibold">Verificados</h2>
              <Badge variant="secondary" className="ml-2">{verifiedChecks.length}</Badge>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {isLoading ? (
              <ChecksSkeleton />
            ) : verifiedChecks.length > 0 ? (
              verifiedChecks.map((check) => (
                <CheckCard key={check.id} check={check} isVerified />
              ))
            ) : (
              <EmptyState message="No hay comprobantes verificados hoy" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckCard({ check, isVerified }: { check: any, isVerified?: boolean }) {
  return (
    <Card className={cn(
      "border-l-4 hover:shadow-md transition-all duration-200 group overflow-hidden",
      isVerified ? "border-l-green-500" : "border-l-yellow-500"
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
              Ref: {check.referencia}
            </p>
            <h3 className="font-bold text-lg">Bs.{Number(check.monto).toLocaleString()}</h3>
          </div>
          <Badge variant={isVerified ? "default" : "outline"} className={cn(
            isVerified ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-yellow-700 border-yellow-200 bg-yellow-50"
          )}>
            {check.tipo_pago}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase">Desde</span>
            <span className="font-medium text-foreground truncate" title={check.origin_banck}>{check.origin_banck}</span>
          </div>
           <div className="flex flex-col">
            <span className="text-[10px] uppercase">Hacia</span>
            <span className="font-medium text-foreground truncate" title={check.destiny_banck}>{check.destiny_banck}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <span className="font-mono bg-muted px-1.5 py-0.5 rounded">Acción: {check.accion}</span>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Action buttons could go here */}
            {check.image_url && (
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" asChild>
                <a href={check.image_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            )}
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChecksSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
           <CardContent className="p-4 h-32"></CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground opacity-60">
      <Search className="w-12 h-12 mb-2 stroke-1" />
      <p>{message}</p>
    </div>
  );
}
