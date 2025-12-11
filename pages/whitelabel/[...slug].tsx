import React from "react";
import WhitelabelMainPage from "../../components/WhitelabelModule/WhitelabelMainPage";

export default function WhitelabelSlug() {
  // Renderea la misma página principal para cualquier subruta por ahora
  return <WhitelabelMainPage />;
}

export async function getServerSideProps() {
  return { props: {} };
}


