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