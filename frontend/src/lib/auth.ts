"use client";

export interface User {
  id: string;
  nome: string;
  email: string;
  role: "ROLE_VISITANTE" | "ROLE_ESTUDANTE" | "ROLE_PROFESSOR" | "ROLE_ADMIN";
  emailVerificado: boolean;
  biografia?: string;
  matricula?: string;
  instituicao?: string;
}

const TOKEN_KEY = "pln_auth_token";
const USER_KEY = "pln_auth_user";

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveAuthSession = (token: string, user: User) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
