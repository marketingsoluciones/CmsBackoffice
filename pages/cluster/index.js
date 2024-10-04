import { useRouter } from "next/router";
import { useEffect } from "react";

const FormacionInterprice = () => {
  const router = useRouter()

  useEffect(() => {
    if (!router.query?.slug) {
      router.push(`/${router.route.split("/")[1]}/buzonProspectos`)
    }
  }, [router])

  return (
    <></>
  );
};

export default FormacionInterprice;