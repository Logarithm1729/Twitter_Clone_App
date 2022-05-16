export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface PROPS_ID {
  id: string;
}

export interface PROFILE {
  id: string;
  user_id: string;
  username: string;
  age: number | undefined;
  prof_image: File | null;
  userProfile: string;
}

export interface REGISTER_PROFILE {
  username: string;
}

export interface PROFILE_ID {
  id: string;
}

export interface FOLLOW {
  userFollowing: string;
  userFollower: string;
}

export const defaultImage = 'http://localhost:8000/media/default/user_image/sample.jpeg'