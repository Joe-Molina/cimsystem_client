export interface Socio {
  nombre: string,
  accion: string,
  activa: true,
  status: number,
  tipo_socio: number,
  sexo: number,
  nfcId: string,
  cedula: string,
  e_mail: string,
  estado_civ: number,
  nacionalid: number,
  nacionalidad: string,
  direccion: string,
  celular: string,
  telefonos: string,
  telefonos_rep: string,
  telefonos_tra: string,
  empresa_tra: string,
  cedula_rep: string,
  nombre_rep: string,
  cuotas_man: number,
  rif_tra: string,
  profesion: string,
  nota: string,
  fecha_ing: string,
  fecha_nac: string
}

export interface familiares {
  accion: string,
  nom_fam: string,
  fec_fam: string,
  sexo_fam: number,
  nfcId: string,
  ced_fam: string,
  par_fam: number,
  cel_fam: string,
  email_fam: string,
  edo_civil: boolean
}

export interface pases {
  accion: string,
  nombre: string,
  activo: number,
  cedula: string,
  cargo: string,
  email: string,
  fecha_venc: string,
  nfcId: string,
  celular: string
}


export interface infoSocios {
  socio: Socio,
  familiares: familiares[],
  pases: pases[]
}

export interface BuscadorProps {
  socios: Socio[]; // Aquí defines que `socios` es un array de `Socio`
}

export interface InfoSociosProps {
  data: infoSocios; // Aquí defines que `socios` es un array de `Socio`
}