export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SigninRequest {
  email: string;
  password: string;
}

// export interface SigninResponse {
//   success: boolean;
//   message: string;
//   token?: string;
//   user?: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }
export interface SigninResponse {
  statuscode: number;
  message: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      isEmailVerified: boolean;
    };
  };
  data: string;
  success: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}
