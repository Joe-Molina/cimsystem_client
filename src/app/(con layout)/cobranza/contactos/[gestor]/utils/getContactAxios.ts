import axios, { AxiosResponse } from "axios";
import { ContactProps } from "../page";

export const getContacts = async () => {
  const response = await axios({
    method: 'get',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/get_contacts',
  });

  
  return response.data
}

export const updateContact = async (id: number) => {
  const response = await axios({
    method: 'patch',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/update_contact',
    data : {
      id
    }
  });


  return response.data
}

export const updateResponse = async (id: number) => {
  const response = await axios({
    method: 'patch',
    withCredentials: true,
    url: 'http://10.10.1.4:3002/interactions/update_response',
    data: {
      id
    }
  });


  return response.data
}