/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormState } from "@/app/mediacim/inicio/interfaces/interfaces";
import {
  serviceSubirRegistro,
} from "@/app/mediacim/inicio/services/subirPublicacion";

export const verificarArchivo = async (
  publis: any,
  file: any,
  formState: FormState,
  IpMonitor: string
) => {
  const compareFillName = publis.filter(
    (publi: any) => publi.name == formState.Form.name
  );
  if (compareFillName.length > 0) {
    return alert(
      "ya hay un documento llamado " +
      formState.Form.name +
      " debes cambiar el nombre del archivo que quieres guardar antes de subirlo"
    );
  } else {
    const data = await serviceSubirRegistro(formState.Form, IpMonitor);
    return data;
  }
};
