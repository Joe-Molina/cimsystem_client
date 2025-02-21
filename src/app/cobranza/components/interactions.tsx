import axios from 'axios'
import { DollarSign, Mail, Phone } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface InteractionData {
  ws: boolean;
  pagoEmail: boolean;
  pagoWs: boolean;
}

// Tipo para los íconos
interface InteractionItem {
  id: string;
  icons: JSX.Element[];
  endpoint: string;
}

export default function Interactions({ accion }: { accion: number }) {
  const [interactionData, setInteractionData] = useState<InteractionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configuración reusable para los items de interacción
  const interactionItems: InteractionItem[] = [
    {
      id: 'whatsapp',
      icons: [<Phone key="phone" color="white" />],
      endpoint: '1'
    },
    {
      id: 'whatsapp-pago',
      icons: [<Phone key="phone" color="white" />, <DollarSign key="dollar" color="white" />],
      endpoint: '3'
    },
    {
      id: 'email-pago',
      icons: [<Mail key="mail" color="white" />, <DollarSign key="dollar" color="white" />],
      endpoint: '2'
    }
  ];

  useEffect(() => {
    const fetchInteractionData = async () => {
      try {
        const endpoints = interactionItems.map(item =>
          axios.get(`http://localhost:3002/interactions/${accion}/${item.endpoint}`)
        );

        const responses = await Promise.all(endpoints);

        console.log(responses)

        setInteractionData({
          ws: responses[0].data,
          pagoWs: responses[1].data,
          pagoEmail: responses[2].data
        });

        console.log(interactionData)

      } catch (err) {
        setError('Error al cargar las interacciones');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInteractionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accion]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className='flex gap-4'>
      {interactionData?.pagoEmail && <div className='flex bg-green-600 p-1 rounded-md'>{interactionItems[2].icons}</div>}
      {interactionData?.ws && <div className='flex bg-green-600 p-1 justify-between rounded-md'>{interactionItems[0].icons}</div>}
      {interactionData?.pagoWs && <div className='flex bg-green-600 p-1 rounded-md'>{interactionItems[1].icons}</div>}
    </div>
  )
}
