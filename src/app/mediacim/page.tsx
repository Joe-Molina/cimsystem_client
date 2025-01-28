import { Toaster } from "sonner";
import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import { IpProvider } from "./inicio/context/IpProvider";
import { PostsProvider } from "./inicio/context/PostProvider";

export default async function Home() {


  return (
    <IpProvider>
      <PostsProvider>
        <main id="app" >
          <FormProvider>
            <Marquee />
          </FormProvider>
        </main>
        <Toaster />
      </PostsProvider>
    </IpProvider>
  )

}