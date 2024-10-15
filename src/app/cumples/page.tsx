'use client'

import axios from "axios";
// import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Cumples() {

  useEffect(() => {
    const response = async () => {
      const res = await axios.get('http://localhost:3000/protected', { withCredentials: true })

      // if (res.status !== 200) {
      //   redirect('/')
      // } else {
      //   return res
      // }

      return res
    }

    response()
  }, [])

  return (
    <div >
      <div>hola 2</div>
    </div>
  );
}
