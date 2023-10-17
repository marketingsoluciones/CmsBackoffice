import { useEffect, useState } from "react";

export const Loading = (set) => {
  set(true)
  setTimeout(() => {
    set(false)
  }, 1000)
}

export function useDelayUnmount(isMounted, delayTime) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    }
    else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(
        () => setShouldRender(false),
        delayTime
      );
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
}

export const getCurrency = (value, currency ) => {
  const v = parseFloat(!!value ? value : 0)
  return v.toLocaleString("de-DE", {
    style: "currency",
    currency: currency?currency:"EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const capitalize = (str) => {
  if(str){
    const lower = str.toLowerCase();
    const firstLetter = str.charAt(0)
    if(["¿", "¡"].includes(firstLetter)){
      return firstLetter +str.charAt(1).toUpperCase() + lower.slice(2);
    }
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
  
  return ""
}


// Objeto de icono perfil
/* export const ImageProfile = {
  hombre: {
    image: "/profile_men.png",
    alt: "Hombre",
  },
  mujer: {
    image: "profile_woman.png",
    alt: "Mujer",
  },
}; */