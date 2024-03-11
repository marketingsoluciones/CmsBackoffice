import { FunctionComponent, useEffect, useState } from "react";

const Componente1: FunctionComponent = () => {
    
    const [view, setView] = useState(false)

    useEffect(() => {
        const rootElement = document.getElementById("rootElement")
        const child = document.getElementById("child")
        if (rootElement) {
          rootElement?.appendChild(child)
        }
      }, [])
      
    return (
    <div>

        <div id="child">

        {view && "modal"}

        </div>
        
        <div onClick={() => {
            setView(true)
        }
        }>
boton
        </div>
    </div>
  );
};

export default Componente1;
