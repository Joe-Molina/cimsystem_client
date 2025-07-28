/* eslint-disable @typescript-eslint/no-explicit-any */
export const serviceSubirArchivoACarpeta = async (
  file: any,
  serverURL: string
) => {
  const form = new FormData();
  form.set("file", file);

  console.log("form");
  console.log(form);

  const res = await fetch(serverURL + `/upload`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  return data;
};

export const serviceSubirRegistro = async (req: any, serverURL: string) => {
  const res = await fetch(serverURL + "/posts", {
    method: "POST",
    body: JSON.stringify(req),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
