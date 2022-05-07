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
  username: string | undefined;
  age: number | undefined;
  prof_image: string | undefined;
  userProfile: number;
}

export interface REGISTER_PROFILE {
  username: string | undefined;
}

export interface PROFILE_ID {
  id: string;
}

export interface FOLLOW {
  userFollowing: number;
  userFollower: number;
}
