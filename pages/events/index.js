import { useRouter } from "next/router";
import { useEffect } from "react";
import { HomeScreen } from "../../components/Events/HomeScreen";

const Business = () => {
  const router = useRouter()
  const pathNames = window.location.pathname.split("/").filter(item => item !== '')
  console.log(100420, pathNames)

  useEffect(() => {
    // if (!router.query?.slug) {
    //   router.push(`/${router.route.split("/")[1]}/brands`)
    // }
  }, [router])

  return (
    <HomeScreen />
  );
};

export default Business;