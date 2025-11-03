import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ContactProps } from '../contactos/types/types';

const fetchCases = async (): Promise<ContactProps[]> => {
  const { data } = await axios.get((`http://10.10.1.4:3002/interactions/get_contacts`))
  return data
}

const fetchCasesHistory = async (): Promise<ContactProps[]> => {
  const { data } = await axios.get((`http://10.10.1.4:3002/interactions/get_contacts_history`))
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
    queryKey: ['casos'],
    queryFn: fetchCases,
    staleTime: 60 * 1000
  })

  const casesHistory = useQuery<ContactProps[], AxiosError>({
    queryKey: ['casos_history'],
    queryFn: fetchCasesHistory,
    staleTime: 60 * 1000
  })

  // const createClientMutation = useMutation<ClientProps, Error, ClientProps>({
  //   mutationFn: createClient,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  // });

  return {
    query,
    casesHistory
    // createClientMutation
  }
}