import { useEffect, useMemo } from "react";
import { MarcasControl } from "../../components/ModuloMarcas/Marcas";
import { CustomWebsTable } from "../../components/ModuloMarcas/WeddingCustomWebs";
import { IframeWorkFlow } from "../../components/ModuloMarcas/IframeWorkFlow";
import { Configuracion } from "../../components/ModuloMarcas/MarcasBlancas";
import { useRouter } from "next/router";
import { LinksControl } from "../../components/ModuloMarcas/Links";
import { BodyStaticAPP } from "../../utils/schemas";


const Slug = () => {
  const router = useRouter()
  const dataComponent = BodyStaticAPP.find(elem => elem.title === "Mis Empresas")?.children.find(elem => elem.route === router.asPath.split("/")[1])
  const findSubComponent = dataComponent?.subComponents.find(elem => elem.route === router.asPath.slice(1))

  
  const schemaChildren = BodyStaticAPP.find(elem => elem.title === "Mis Empresas")?.children.filter(elem => elem.hidden)

  

  console.log(222222,dataComponent,findSubComponent);
  console.log(33333,schemaChildren);

  const componentsMap = useMemo(() => ({
    "/brands": <MarcasControl ComponentControl={findSubComponent} />,
    "/mywebsites": <CustomWebsTable />,
    "/workflow": <IframeWorkFlow />,
    "/links": <LinksControl schemaChildren={schemaChildren} />,
    "/whitelabel": <Configuracion />,
  }), [ schemaChildren]);

  const currentSlug = router.query.slug && router.query.slug[0] 
    ? `/${router.query.slug[0]}` 
    : null;
 
  const currentComponent = currentSlug ? componentsMap[currentSlug] : null;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!currentSlug) {
      const basePath = router.route.split("/")[1];
      const isBaseRoute = router.asPath === `/${basePath}` || router.asPath === `/${basePath}/`;
      if (isBaseRoute) {
        router.replace(`/${basePath}/brands`);
      }
      return;
    }

    if (!componentsMap[currentSlug]) {
      const basePath = router.route.split("/")[1];
      router.replace(`/${basePath}/brands`);
    }
  }, [router.isReady, currentSlug, router.asPath, router.route, componentsMap])

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 flex z-10">
        {currentComponent || null}
      </div>
    </div>
  );
};

export default Slug;

export async function getServerSideProps({ params }) {
  return {
    props: params,
  };
}
