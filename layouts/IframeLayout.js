import { SocketContextProvider, AuthContextProvider } from "../context"

export const IframeLayout = () => {
  const { showApp } = AuthContextProvider()
  const { fatherID } = SocketContextProvider()

  const path = window?.origin?.includes("://testcms.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? ""
  return (
    <div id="iframeapp" className={`${!showApp ? "hidden" : "flex"} bg-white flex-1 h-full`} >
      <iframe src={`${path}/?show=iframe&father=${fatherID}`} className="flex-1 h-[89vh] md:h-[100%]"></iframe>
    </div>
  )
}