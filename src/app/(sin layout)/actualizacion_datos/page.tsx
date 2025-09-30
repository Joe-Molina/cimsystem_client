"use client"

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';  

interface FormData {
  accion : string,
  registrador: string
	apellidos : string,
	cedula : number,
  email: string,
	edo_civil : "casado" | "soltero" | "viudo" | "divorciado",
	fecha_nacimiento : Date,
	lugar_nacimiento: string,
	nacionalidad: string,
	nombres:string,
	parentesco:string ,
	profesion:string ,
	residencia:string ,
	rif: string,
	sexo:string,
	telefono_celular: string,
	telefono_trabajo:string
	telofono_hogar:string
	tipo_socio: 1 | 2
}


export default function Home() {

  const {
    register, // Función para registrar inputs
    handleSubmit, // Función para manejar el envío del formulario
    formState: { errors, isSubmitting }, // Objeto con errores de validación
    reset // Función para resetear el formulario
  } = useForm<FormData>({
    defaultValues: {
    registrador: "",
    email: "",
    accion: "",
	  apellidos :   "",
	  cedula : 0,
	  edo_civil : "casado",
	  fecha_nacimiento : new Date(),
	  lugar_nacimiento:   "",
	  nacionalidad:   "",
	  nombres:  "",
	  parentesco:  "" ,
	  profesion:  "" ,
	  residencia:  "" ,
	  rif: "",
	  sexo:  "",
	  telefono_celular:   "",
	  telefono_trabajo:  "",
	  telofono_hogar:  "",
	  tipo_socio: 1
    }
  });

   const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmissionStatus('idle'); // Reiniciar estado
    setErrorMessage(''); // Limpiar mensaje de error

    try {
      // **Aquí es donde usamos Axios**
      // Reemplaza 'http://localhost:3000/api/formulario' con la URL de tu API real
      const response = await axios.post('http://10.10.1.4:3006/save', data);

      console.log('Respuesta del servidor:', response.data);
      setSubmissionStatus('success');
      reset(); // Limpiar el formulario después del envío exitoso

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmissionStatus('error');
      if (axios.isAxiosError(error) && error.response) {
        // Si es un error de Axios y hay una respuesta del servidor
        setErrorMessage(error.response.data.message || 'Error desconocido del servidor.');
      } else {
        setErrorMessage('Hubo un problema al conectar con el servidor.');
      }
    }
  };

  const inputClasses = "w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-600 text-xs mt-1";


  return (
    <div className="w-full h-full flex justify-center bg-gradient-to-br from-slate-800 to-cyan-900 items-center ">
      <section className=" flex h-4/5 w-5/6 bg-white rounded-lg shadow-xl hover:scale-105 transition">
        <Image src="/fotos/cim.jpg" alt="tumama" className="w-5/12 h-full rounded-l-md" width={800} height={800} />
      <article className="flex flex-col w-7/12 h-full rounded-r-md p-1 justify-center items-center">
      <div className="p-1 mx-auto bg-white rounded-lg overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">actualizacion ficha de Socio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
  {/* registrador */}
        <div>
          <label htmlFor="registrador" className={labelClasses}>quien registra?:</label>
          <select
            id="registrador"
            {...register('registrador')}
            className={inputClasses}
            disabled={isSubmitting}
            required
          >
            <option value="">Selecciona quien registra...</option>
            <option value="Maryelin">Maryelin</option>
            <option value="gianfranco">gianfranco</option>
            <option value="maria fernanda">maria fernanda</option>
            <option value="norberto">norberto</option>
            <option value="lorena">lorena</option>
            <option value="saul">saul</option>
            <option value="rubmairys">rubmairys</option>
            <option value="yusmari">yusmari</option>
            <option value="libia">libia</option>
          </select>
          {errors.registrador && <p className={errorClasses}>{errors.registrador.message}</p>}
        </div>

            {/*accion */}
        <div>
          <label htmlFor="accion" className={labelClasses}>Accion:</label>
          <input
            type="text"
            id="accion"
            {...register('accion')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.accion && <p className={errorClasses}>{errors.accion.message}</p>}
        </div>

        {/* Nombres */}
        <div>
          <label htmlFor="nombres" className={labelClasses}>Nombres:</label>
          <input
            type="text"
            id="nombres"
            {...register('nombres')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.nombres && <p className={errorClasses}>{errors.nombres.message}</p>}
        </div>

        {/* Apellidos */}
        <div>
          <label htmlFor="apellidos" className={labelClasses}>Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            {...register('apellidos')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.apellidos && <p className={errorClasses}>{errors.apellidos.message}</p>}
        </div>

        {/* Cédula */}
        <div>
          <label htmlFor="cedula" className={labelClasses}>Cédula:</label>
          <input
            type="number"
            id="cedula"
            {...register('cedula', {
              required: 'La cédula es obligatoria',
              min: { value: 1, message: 'La cédula debe ser un número positivo' },
              valueAsNumber: true
            })}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.cedula && <p className={errorClasses}>{errors.cedula.message}</p>}
        </div>

        {/* RIF */}
        <div>
          <label htmlFor="rif" className={labelClasses}>RIF:</label>
          <input
            type="text"
            id="rif"
            {...register('rif')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.rif && <p className={errorClasses}>{errors.rif.message}</p>}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email:</label>
          <input
            type="text"
            id="email"
            {...register('email')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        {/* Nacionalidad */}
        <div>
          <label htmlFor="nacionalidad" className={labelClasses}>Nacionalidad:</label>
          <input
            type="text"
            id="nacionalidad"
            {...register('nacionalidad')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.nacionalidad && <p className={errorClasses}>{errors.nacionalidad.message}</p>}
        </div>

        {/* Género */}
        <div>
          <label htmlFor="sexo" className={labelClasses}>Género:</label>
          <select
            id="sexo"
            {...register('sexo')}
            className={inputClasses}
            disabled={isSubmitting}
          >
            <option value="">Selecciona...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          {errors.sexo && <p className={errorClasses}>{errors.sexo.message}</p>}
        </div>

        {/* Estado Civil */}
        <div>
          <label htmlFor="edo_civil" className={labelClasses}>Estado Civil:</label>
          <select
            id="edo_civil"
            {...register('edo_civil')}
            className={inputClasses}
            disabled={isSubmitting}
          >
            <option value="">Selecciona...</option>
            <option value="soltero">Soltero(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viudo">Viudo(a)</option>
          </select>
          {errors.edo_civil && <p className={errorClasses}>{errors.edo_civil.message}</p>}
        </div>

        {/* Profesión */}
        <div>
          <label htmlFor="profesion" className={labelClasses}>Profesión:</label>
          <input
            type="text"
            id="profesion"
            {...register('profesion')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.profesion && <p className={errorClasses}>{errors.profesion.message}</p>}
        </div>

        {/* Residencia */}
        <div>
          <label htmlFor="residencia" className={labelClasses}>Residencia:</label>
          <input
            type="text"
            id="residencia"
            {...register('residencia')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.residencia && <p className={errorClasses}>{errors.residencia.message}</p>}
        </div>

        {/* Teléfono Celular */}
        <div>
          <label htmlFor="telefono_celular" className={labelClasses}>Teléfono Celular:</label>
          <input
            type="tel"
            id="telefono_celular"
            {...register('telefono_celular')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.telefono_celular && <p className={errorClasses}>{errors.telefono_celular.message}</p>}
        </div>

        {/* Parentesco (si aplica) */}
        <div>
          <label htmlFor="parentesco" className={labelClasses}>Parentesco:</label>
          <input
            type="text"
            id="parentesco"
            {...register('parentesco')}
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.parentesco && <p className={errorClasses}>{errors.parentesco.message}</p>}
        </div>

        {/* Tipo de Socio */}
          <div>
          <label htmlFor="tipo_socio" className={labelClasses}>Tipo de Socio:</label>
          <select
            id="tipo_socio"
            {...register('tipo_socio')}
            className={inputClasses}
            disabled={isSubmitting}
          >
            <option value="">Selecciona...</option>
            <option value={1}>Titular</option>
            <option value={2}>Familiar</option>
          </select>
          {errors.tipo_socio && <p className={errorClasses}>{errors.tipo_socio.message}</p>}
        </div>
        {/* Botón de Envío */}
        <div className="md:col-span-2 text-center mt-4"> {/* Ocupa ambas columnas en pantallas grandes */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              py-3 px-6 rounded-md text-white font-semibold transition duration-300 ease-in-out
              ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {isSubmitting ? 'Enviando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
        </article>
      </section>
    </div>
  );
}
