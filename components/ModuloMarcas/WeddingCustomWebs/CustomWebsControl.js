import { useState } from "react"
import { AuthContextProvider } from "../../../context"

import { DescripcionCardEmpresas, WebBuilder } from "../WeddingCustomWebs"
import Section1 from "./Section1"

export const CustomWebsControl = ({ setPage, page }) => {
  const [findData, setFindData] = useState("")

  return (
    <div className="">
      {page === "principal" &&
        <Section1
          setPage={setPage}
          page={page}
          setFindData={setFindData}
        />
      }
      {page === "demo" &&
        <DescripcionCardEmpresas
          setPage={setPage}
          page={page}
          findData={findData}
        />
      }
      {page === "WebBuilder" &&
        <WebBuilder />
      }

    </div>
  )
}