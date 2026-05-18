import { store } from "../../../app/store/store";
import { baseApi } from "../../../shared/api/baseApi";

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

/** ID поточного юзера з JWT (поле sub). */
export function getUserIdFromToken(): string | null {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
  store.dispatch(baseApi.util.resetApiState());
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
  store.dispatch(baseApi.util.resetApiState());
}
