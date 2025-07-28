/* eslint-disable @typescript-eslint/no-explicit-any */
export const postPosition = async (
  publi: any,
  position: number,
  setPosition: any
) => {
  const res = await fetch(`/api/subirInfo/${publi.id}`, {
    method: "PUT",
    body: JSON.stringify({ position }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const datos = await res.json();

  if (datos) {
    console.log(datos);
    if (datos.newPositions.publi2) {
      console.log(datos);
      setPosition(
        datos.newPositions.publi1.id,
        datos.newPositions.publi1.position
      );
      setPosition(
        datos.newPositions.publi2.id,
        datos.newPositions.publi2.position
      );
    } else {
      setPosition(publi.id, position);
    }
  }
};

export const postDuration = async (
  publi: any,
  duration: number,
  setDuration: any
) => {
  const res = await fetch(`/api/subirInfo/${publi.id}`, {
    method: "PUT",
    body: JSON.stringify({ duration }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const datos = await res.json();

  if (datos) {
    setDuration(publi.id, duration);
  }
};
