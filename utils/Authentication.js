import { useCallback } from "react";
import { fetchApi, queries } from "./Fetching";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../context/AuthContext";
import { getAuth, signOut } from 'firebase/auth';
import { useToast } from "@chakra-ui/react";

export const authentication = {
  SignOut: async () => {
    await signOut(auth);
    return null;
  },
};

export const parseJwt = (token) => {
  if (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  return {}
}

export const useAuthentication = () => {
  const toast = useToast();
  const router = useRouter()
  const { setUser, domain, config } = AuthContextProvider()

  const _signOut = useCallback(async () => {
    const domainCookie = `${domain}`
    await fetchApi({ query: queries.signOut, variables: { sessionCookie: Cookies.get(config?.cookie) }, development: domain })
    Cookies.remove(config?.cookie, { domain: domainCookie });
    Cookies.remove("idToken", { domain: domainCookie });
    setUser(null);
    getAuth().signOut()
    setTimeout(async () => {
      const path = window.origin.includes("://test") ? config?.domain.replace("//", "//test.") : config?.domain
      await router.push(path);
    }, 500);
    toast({
      status: "success",
      title: "Gracias por visitarnos, te esperamos luego 😀",
      isClosable: true,
    });
  }, [router, setUser, toast])
  return { _signOut };
};