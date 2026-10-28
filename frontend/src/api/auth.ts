import { api } from "./client";

export async function loginUser(email: string, password: string) {
  return api.login(email, password);
}

export async function signup(name: string, email: string, password: string, targetRole?: string) {
  return api.signup(name, email, password, targetRole);
}
