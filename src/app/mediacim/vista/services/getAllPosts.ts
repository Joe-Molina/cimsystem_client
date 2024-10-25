import { getPosts } from "@/app/inicio/services/Posts";
import { verificarEstadoActividad } from "@/app/inicio/services/verificarActividad";
import { sortByPriority } from "./sortByPriority";
import { separatePosts } from "./separatePosts";

export const getAllPosts = async (posts: any, setDividedPosts: any) => {
    const ActivePosts = posts.Posts.filter((publi: any) => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)
    const sortedArray = [...ActivePosts].sort(sortByPriority);
    const separatedPosts = separatePosts(sortedArray);
    setDividedPosts({ publis: separatedPosts.publis, Banners: separatedPosts.Banners })
}