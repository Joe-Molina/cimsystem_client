import { ContactProps } from "../../contactos/types/types";

export const separateDataByGestor = (cases: ContactProps[]) => {
  
  const maryelin = cases.filter(caso => caso.userId == 2) 
  const franco = cases.filter(caso => caso.userId == 3) 
  const daniela = cases.filter(caso => caso.userId == 4) 

  return {
    closeCases: {
      maye: maryelin.filter(caso => caso.caseStatus && !caso.contactAvailable).length,
      franco: franco.filter(caso => caso.caseStatus && !caso.contactAvailable).length,
      dani: daniela.filter(caso => caso.caseStatus && !caso.contactAvailable).length
    },
    noResponse: {
      maye: maryelin.filter(caso => !caso.response && !caso.responseCall && !caso.contactAvailable).length,
      franco: franco.filter(caso => !caso.response && !caso.responseCall && !caso.contactAvailable).length,
      dani: daniela.filter(caso => !caso.response && !caso.responseCall && !caso.contactAvailable).length
    },
    payments: {
      maye: maryelin.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).length,
      franco: franco.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).length,
      dani: daniela.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).length
    },
    totalPayments: {
      maye: maryelin.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).reduce((acc, av) => acc + (av.cuotasIniciales - av.cuotasActuales!) , 0),
      franco: franco.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).reduce((acc, av) => acc + (av.cuotasIniciales - av.cuotasActuales!), 0),
      dani: daniela.filter(caso => caso.cuotasActuales! < caso.cuotasIniciales).reduce((acc, av) => acc + (av.cuotasIniciales - av.cuotasActuales!), 0),
    },
    contactUnavailable: {
      maye: maryelin.filter(caso => caso.contactAvailable).length,
      franco: franco.filter(caso => caso.contactAvailable).length,
      dani: daniela.filter(caso => caso.contactAvailable ).length
    },
  }
};