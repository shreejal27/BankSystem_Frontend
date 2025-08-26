// src/hooks/useTokenDecodedData.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  exp: number;
  iss: string;
  aud: string;
}

export function useTokenDecodedData(token: string | null) {
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
      userId: decoded.sub,
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      exp: decoded.exp,
      issuer: decoded.iss,
      audience: decoded.aud,
    };
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
