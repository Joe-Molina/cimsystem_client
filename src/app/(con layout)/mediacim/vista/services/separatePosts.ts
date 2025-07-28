/* eslint-disable @typescript-eslint/no-explicit-any */

export const separatePosts = (posts: any) => {

  const publis = posts.filter((element: { type: string }) => {

    if (element.type == "img" || element.type == "video") {
      return true
    }
  })

  const Banners = posts.filter((element: { type: string }) => {

    if (element.type == "banner") {
      return true
    }
  })

  return { publis, Banners }

}
