import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Cobranza_info } from '../components/DataTable';

const fetchAllCobranzaInfo = async (): Promise<Cobranza_info[]> => {
  const { data } = await axios.get((`http://10.10.1.4:3000/cobranza`))
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

export const useAllCobranzaInfo = () => {
  // const queryClient = useQueryClient();

  const query = useQuery<Cobranza_info[], AxiosError>({
    queryKey: ['deudas'],
    queryFn: fetchAllCobranzaInfo,
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