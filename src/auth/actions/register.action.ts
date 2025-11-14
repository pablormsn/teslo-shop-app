import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (
  email: string,
  fullname: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>("/auth/register", {
      email,
      fullname,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
