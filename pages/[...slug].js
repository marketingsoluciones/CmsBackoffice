import { Flex } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import dynamic from 'next/dynamic'
const PanelEditAndCreate = dynamic(() => import('../components/PanelEditAndCreate').then(mod => mod.PanelEditAndCreate), { ssr: false })
import { PagesWithAuth } from "../HOC/PageWithAuth";
import { PanelViewTable } from "../components/PanelViewTable";
import { FormDinamicalNEW } from "../components/Resumen"
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from "next/router";


const Slug = ({ slug: slugArr, props }) => {
  const slug = slugArr.toString().replace(/,/g, "/")
  const { state, dispatch } = AuthContextProvider()
  const r = useRouter()

  useEffect(() => {
    if (r?.query?.d === "create") {
      dispatch({ type: "CREATE", payload: {} });
    }
  }, [slug, r]);
  if (slugArr.length === 1) {
    return (
      <Flex as={"section"} flexDir={"column"} gap={"1rem"} h={"100%"} w={"100%"} className="px-5 py-2">
        {state.type === "view" && (
          <PanelViewTable slug={slug} dispatch={dispatch} />
        )}
        {state.type === "vieww" && (
          <FormDinamicalNEW setAction={dispatch} slug={slug} state={state} />
        )}
        {["edit", "create"].includes(state.type) && (
          <PanelEditAndCreate setAction={dispatch} slug={slug} state={state} />
        )}
      </Flex>
    );
  }
  return (
    <div className="bg-red-200 text-blue-700 w-full h-full ">
      404
    </div>
  )
};

export default Slug;

export async function getServerSideProps({ params }) {
  return {
    props: params,
  };
}
