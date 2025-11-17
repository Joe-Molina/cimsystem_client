export interface ContactProps {
  id: number;
  nombre: string;
  createdAt: Date;
  userId: number;
  accion: string;
  contactAvailable: boolean;
  contact: boolean;
  contact_createdAt?: Date;
  response: boolean;
  response_createdAt?: Date;
  contactCall: boolean;
  contactCall_createdAt?: Date;
  responseCall: boolean;
  responseCall_createdAt?: Date;
  PromisePayment: boolean;
  PromiseNonPayment: boolean;
  note: string;
  caseStatus: boolean;
  cuotasIniciales: number;
  cuotasActuales: number;
}

export interface ContactActions {
  actualizarContacto: (id: number) => Promise<void>;
  actualizarResponse: (id: number) => Promise<void>;
  actualizarContactoCall: (id: number) => Promise<void>;
  actualizarResponseCall: (id: number) => Promise<void>;
  actualizarContactAvailable: (id: number) => Promise<void>;
}
