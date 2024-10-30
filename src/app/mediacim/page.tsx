import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
// import { conect } from "./getSession";
// import { redirect } from "next/navigation";



export default async function Home() {
  // const session = await conect()
  // if (!session) redirect("/login")

  return (
    <FormProvider>
      <Marquee />
    </FormProvider>
  );
}

