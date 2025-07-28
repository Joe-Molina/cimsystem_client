/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL_POSTS } from "@/app/(con layout)/mediacim/inicio/services/EndPoints";

export const getPosts = async (urlMonitor: string) => {
  const res = await fetch(urlMonitor + URL_POSTS);
  const data = await res.json();
  return await data;
};

export const serviceDeletePost = async (urlMonitor: string, id: any) => {
  const res = await fetch(`${urlMonitor}${URL_POSTS}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return await data;
};
