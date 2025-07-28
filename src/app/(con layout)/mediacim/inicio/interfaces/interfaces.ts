export interface Post {
  id: number;
  name: string;
  type: string;
  position: number;
  duration: number;
  fecha_inicio: Date;
  Fecha_Fin: Date;
}

export interface FormState {
  Form: Post;
}

export interface PostState {
  Posts: Post[];
}
