import { useRouter } from "next/router";
import { useEffect } from "react";
import { HomeScreen } from "../../components/Events/HomeScreen";

const Business = () => {
  const router = useRouter()

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