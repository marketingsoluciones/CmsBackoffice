import { useRouter } from "next/router";
import { useEffect } from "react";

const Business = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.query?.slug) {
      router.push(`/${router.route.split("/")[1]}/brands`)
    }
  }, [router])

  return (
    <></>
  );
};

export default Business;