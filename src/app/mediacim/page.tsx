import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import Nav from './inicio/components/Nav';
// import { conect } from "./getSession";
// import { redirect } from "next/navigation";



export default async function Home() {
  // const session = await conect()
  // if (!session) redirect("/login")

  return (
    <FormProvider>

      <main id="app" className="flex-col-reverse max-h-screen h-screen">
        <Nav />
        <Marquee />
      </main>

    </FormProvider>
  );
}

