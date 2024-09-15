import { useState } from "react"
import { AuthContextProvider } from "../../../context"

import { DescripcionCardEmpresas, WebBuilder } from "../WeddingCustomWebs"
import Section1 from "./Section1"
import SectionEmpresas from "./SectionEmpresas"

export const CustomWebsControl = ({ setPage, page, type }) => {
  const [findData, setFindData] = useState("")

  return (
    <div className="py-2 px-3">
      {(() => {
        if (page === "principal") {
          if (type === "novios") {
            return (
              <Section1 setPage={setPage} page={page} setFindData={setFindData} />
            )
          }
          if (type === "empresa") {
            return (
              <SectionEmpresas setPage={setPage} page={page} setFindData={setFindData} />
            )
          }
        }
      })()}
      {page === "demo" &&
        <DescripcionCardEmpresas setPage={setPage} page={page} findData={findData} />
      }
      {page === "WebBuilder" &&
        <WebBuilder setCommponent={setPage} />
      }

    </div>
  )
}