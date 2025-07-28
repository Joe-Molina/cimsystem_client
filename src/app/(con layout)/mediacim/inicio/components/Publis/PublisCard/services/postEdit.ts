/* eslint-disable @typescript-eslint/no-explicit-any */
export const editPost = async (edit: any, serverULR: string, id: number) => {
  const res = await fetch(`${serverULR}/posts`, {
    method: "PUT",
    body: JSON.stringify({ edit, id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data
}

export const getdate = async (serverULR: string, id: number) => {
  const res = await fetch(`${serverULR}/posts/${id}`);

  const data = await res.json();

  return data
}