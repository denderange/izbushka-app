export const DEFAULT_LOGIN_REDIRECT = "/";

export const AUTH_ROUTES = ["/sign-in", "/sign-up"] as const;

export const PUBLIC_ROUTES = ["/", "/pricing", "/about"] as const;

export const PROTECTED_ROUTES = ["/dashboard"] as const;
