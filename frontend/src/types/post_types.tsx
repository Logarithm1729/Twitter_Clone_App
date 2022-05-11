export interface POST_CREATE {
  title: string;
  content: string;
  post_image: string;
}

export interface POST_GET_RESPONCE {
  id: string;
  title: string;
  content: string;
  post_image: string;
  userPost: string;
  created_at: string;
}

export interface COMMENT_CREATE {
  comment: string;
  postComment: string;
}

export interface PUSH_LIKE {
  userLike: string;
  postLike: string | undefined;
}
