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
    await signOut(getAuth());
    const path = window.origin.includes("://test") ? config?.domain.replace("//", "//test.") : config?.domain
    await router.push(path);
    toast({
      status: "success",
      title: "Gracias por visitarnos, te esperamos luego 😀",
      isClosable: true,
    });
  }, [router, setUser, toast])
  return { _signOut };
};