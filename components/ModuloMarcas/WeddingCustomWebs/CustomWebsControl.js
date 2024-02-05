import { useState } from "react"
import { AuthContextProvider } from "../../../context"

import { DescripcionCardEmpresas } from "../WeddingCustomWebs"
import Section1 from "./Section1"

export const CustomWebsControl = () => {
  const [page, setPage] = useState(false)
  const [findData, setFindData] = useState("")

  return (
    <>
      {!page ?
        <Section1 setPage={setPage} page={page} setFindData={setFindData} />
        :
        <DescripcionCardEmpresas setPage={setPage} page={page} findData={findData} />
      }
    </>
  )
}