import { redirect } from "next/navigation";

export const session = async(data: any) => {

    const res = await fetch(`http://localhost:3001/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const datos = await res.json();

      console.log(datos)

      return datos

 }

export const logout = async() => {
  const res = await fetch(`http://localhost:3001/logout`, {
    credentials: "include",
  });
  
  const datos = await res.json();
  
  console.log(datos)
  
  return datos
}

export const conect = async() => {
  const res = await fetch(`http://localhost:3001/`);
  const datos = await res.json();

  const {conect} = datos

  return conect
}
