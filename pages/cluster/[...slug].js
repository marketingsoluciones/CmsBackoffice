import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { SlideBar1 } from "../../components/NuevoEvento/ClusterMod/utilidades/SlideBar1";
import { ColumnsDefTable} from "../../components/NuevoEvento/ClusterMod";
import { BodyStaticAPP } from "../../utils/schemas";

const Slug = ({ props }) => {
    const router = useRouter()
    const [optionSelect, setOptionSelect] = useState(0)
    const [dataComponents, setDataComponents] = useState([])
    const schemaChildren = BodyStaticAPP.find(elem => elem.title === "Formacion Enterprice")?.children.filter(elem => elem.hidden)

    useEffect(() => {
        setDataComponents([...schemaChildren])
    }, [])

    useEffect(() => {
        const f1 = dataComponents?.findIndex(elem => elem.route === `${router.asPath.split("/")[1]}/${router.query.slug[0]}`)
        if (f1 > -1) {
            setOptionSelect(f1)
        }
    }, [router])

    const handleClickOption = (idx) => {
        router.push(`/${dataComponents[idx].route}`)
    };

    const newArryDataComponents = dataComponents.slice()
    newArryDataComponents.splice(8, 1)

    console.log(44444,schemaChildren);

    return (
        <div className={`md:flex h-full w-full`}>
            <SlideBar1
                dataComponents={newArryDataComponents}
                onClick={handleClickOption}
                optionSelect={optionSelect}
            />
            <div className="md:flex-1 items-center justify-center px-5 py-5">
                {
                    dataComponents[optionSelect]?.component 
                }
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
