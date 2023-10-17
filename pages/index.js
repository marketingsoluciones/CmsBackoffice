import { AuthContextProvider } from "../context/AuthContext";
import { Login } from "../components/login";
import { useEffect } from "react";
import { fetchApi, queries } from "../utils/Fetching";
import { visibleColumns } from "../utils/schemas";
import { useRouter } from "next/router";
import { IndexPage } from "../components/IndexPage";

function HomePage() {
  const { user, verificandoCookie, config } = AuthContextProvider();
  const r = useRouter()

  useEffect(() => {
    /////// REDIRECIONES ///////
    setTimeout(() => {
      if (r?.query?.d === "busines") {
        r.push("/business?d=create")
      } else if (r?.query?.d === "viewBusines") {
        r.push("/business")
      }
    }, 300);
  }, [r]);

  useEffect(() => {
    if (user?.visibleColumns?.length == 0) {
      fetchApi({
        query: queries.updateVisibleColumns,
        variables: { uid: user?.uid, args: visibleColumns },
        development: config?.name
      })
    }
  }, [user])

  if (verificandoCookie) {

    if (!user) {
      return <Login />
    }
    return (
      <>
        <IndexPage />
      </>
    )
  }
  return <></>
}
export default HomePage