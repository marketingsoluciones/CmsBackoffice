import { useRouter } from "next/router";
import { LoadingLayout } from "../components/LoadingLayout";
import { AuthContextProvider } from "../context/AuthContext";

export const PagesWithAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const { user } = AuthContextProvider()
      console.log(60010, "Verificar PagesWithAuth")
      const router = useRouter();


      // if (!user) {
      //   console.log("entro")
      //   router.replace("/login");
      //   return <LoadingLayout />;
      // }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default PagesWithAuth;
