import { Post } from '@/app/inicio/interfaces/interfaces';
import { verificarEstadoActividad } from '@/app/inicio/services/verificarActividad';

export function useFilterPosts(posts: Post[]) {

    const ActivePosts = posts.filter((publi: any) => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)

    const Posts = ActivePosts.filter((element: { type: string }) => {

        if (element.type == "img" || element.type == "video") {
            return true
        }
    })

    const Banners = ActivePosts.filter((element: { type: string }) => {
        if (element.type == "banner") {
            return true
        }

    })

    return { Posts, Banners }

}
