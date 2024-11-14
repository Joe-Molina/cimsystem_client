import { useEffect, useState } from "react"
import { TableBProps } from "../components/tableBirthDays"

export const useBirdthDay = () => {

  const [Today, setToday] = useState<TableBProps>()
  const [Tomorrow, setTomorrow] = useState<TableBProps>()
  const [Month, setMonth] = useState<TableBProps>()


  useEffect(() => {

    fetch(`http://10.10.1.4:3000/cumples/today`)
      .then(res => res.json())
      .then(response => {
        setToday(response)
      })

  }, [])

  useEffect(() => {

    fetch(`http://10.10.1.4:3000/cumples/tomorrow`)
      .then(res => res.json())
      .then(response => {
        setTomorrow(response)
      })

  }, [])

  useEffect(() => {

    fetch(`http://10.10.1.4:3000/cumples/month`)
      .then(res => res.json())
      .then(response => {
        setMonth(response)
      })

  }, [])

  return { Today, Tomorrow, Month }

}