import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ContactProps } from '../contactos/types/types';
import { toast } from 'sonner';

export interface ClientProps {
  id?: number
  name: string
  adress: string
  dni: string
  phone: number
}

const fetchCases = async (): Promise<ContactProps[]> => {
  const { data } = await axios.get((`http://10.10.1.4:3002/interactions/get_contacts`))
  return data
}

// const createClient = async (newClient: ClientProps): Promise<ClientProps> => {
//   const { data } = await api.post('/client/create', newClient);
//   if (data) {
//     toast(`creaste un nuevo cliente de forma exitosa`)
//   } else {
//     toast(`error al crear el cliente`)
//   }
//   return data
// }

export const useCases = () => {
  // const queryClient = useQueryClient();

  const query = useQuery<ContactProps[], AxiosError>({
    queryKey: ['clients'],
    queryFn: fetchCases,
    staleTime: 60 * 1000
  })

  // const createClientMutation = useMutation<ClientProps, Error, ClientProps>({
  //   mutationFn: createClient,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  // });

  return {
    query,
    // createClientMutation
  }
}