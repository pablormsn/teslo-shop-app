import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth-action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "unauthenticated" | "checking";

type AuthState = {
  //Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  //Getters
  isAdmin: () => boolean;
  //Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    email: string,
    fullname: string,
    password: string
  ) => Promise<boolean>;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  //Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
    //return !!get().user?.roles.includes("admin");
  },

  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        authStatus: "unauthenticated",
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      authStatus: "unauthenticated",
    });
  },

  register: async (email: string, fullname: string, password: string) => {
    try {
      const data = await registerAction(email, fullname, password);
      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        authStatus: "unauthenticated",
      });
      return false;
    }
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      console.log(error);
      set({
        user: undefined,
        token: undefined,
        authStatus: "unauthenticated",
      });
      return false;
    }
  },
}));
