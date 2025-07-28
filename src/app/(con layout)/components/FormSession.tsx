'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"
import axios from "axios"

export function FormSession() {

  const [incorrectPassword, setIncorrectPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username)
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    console.log(password)
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email)
  };

  const sendLogIn = async () => {
    const response = await axios({
      method: 'post',
      withCredentials: true,
      url: 'http://localhost:3000/login',
      data: {
        username: username,
        password: password
      }
    });

    console.log(response)

    if (response.data.alert) {
      setIncorrectPassword(true)
    } else {
      setIncorrectPassword(false)
    }

    return response
  }



  return (
    <Tabs defaultValue="Iniciarsesion" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Iniciarsesion">Iniciar sesion</TabsTrigger>
        <TabsTrigger value="CrearCuenta">Crear Cuenta</TabsTrigger>
      </TabsList>
      <TabsContent value="Iniciarsesion">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesion</CardTitle>
            <CardDescription>
              Introduce tu nombre de usuario y contraseña para iniciar sesion.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Usuario:</Label>
              <Input id="name" placeholder="Usuario ..." onChange={handleChangeUsername} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña:</Label>
              <Input id="password" type="password" placeholder="contraseña ..." onChange={handleChangePassword} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={sendLogIn}>Iniciar sesion</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="CrearCuenta">
        <Card>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
            <CardDescription>
              Introduce los datos necesarios para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Usuario</Label>
              <Input id="current" type="text" placeholder="Usuario ..." onChange={handleChangeUsername} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current2">Email</Label>
              <Input id="current2" type="email" placeholder="Email ..." onChange={handleChangeEmail} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Contraseña</Label>
              <Input id="new" type="password" placeholder="Contraseña ..." onChange={handleChangePassword} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={sendLogIn}>Crear cuenta</Button>
            {incorrectPassword && <div>Contraseña incorrecta</div>}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}