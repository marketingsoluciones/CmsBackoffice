import {
    Flex,
    useToast,
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import { useEffect, useCallback, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { FindOption } from "../../components/Datatable/Columns";
import { LoadingComponent } from "../../components/LoadingComponent";
import { fetchApi } from "../../utils/Fetching";
import { CuadroItems, CuadroImagenSmall, CuadroTituloSlug, CuadroInfoSimple, CuadroMultiInfo, CuadroContacto, CuadroSocial, CuadroImg } from "./CuadroInfo";
import { LinkedinI, TwitterIconI, YoutubeIconI, WhatsappIconI, UserIcon, EmailIconn, PhoneMobile, WebSiteIcon, FacebookIcon2, InstagramIcon2, ArrowLeft } from "../Icons/index";

export const FormDinamicalNEW = ({ slug, setAction, state }) => {

    const [valuesEdit, loadingValues, errorValues, setQueryValues] = useFetch();
    const toast = useToast();
    const options = FindOption(slug);
    const imagee = valuesEdit?.imgCarrusel


    useEffect(() => {
        if (state.type === "vieww") {
            setQueryValues({
                ...options?.getByID,
                variables: { id: state.data._id },
                type: "json",
            });
        }
    }, [state]);

    /* Fetch para actualizar */
    const fetchUpdate = useCallback(
        async ({
            _id,
            characteristics2,
            questionsAndAnswers2,
            categories,
            ...values
        }) => {
            try {
                delete values.createdAt;
                delete values.updatedAt;
                const data = await fetchApi({
                    query: options?.updateEntry?.query,
                    variables: { id: _id, args: values },
                    type: "formData"
                });

                if (data) {
                    toast({
                        status: "success",
                        title: "Operacion exitosa",
                        isClosable: true,
                    });
                    setAction({ type: "VIEW", payload: {} });
                } else {
                    throw new Error(10012, "Error en la peticion");
                }
            } catch (error) {
                toast({
                    status: "error",
                    title: "Error",
                    description: JSON.stringify(error),
                    isClosable: true,
                });
                console.log(error);
            }
        },
        [slug]
    );

    const handleSubmit = (values) => {
        state.type === "edit" && fetchUpdate(values);
    };

    return (
        <Flex flexDir={"column"} overflow={"auto"} maxH={"100%"} mb={"4rem"}>
            {!loadingValues && !errorValues ? (
                <>
                    <div className="px-5">
                        <div className="flex flex-col mb-5 mt-2">
                            <div className="flex  items-center">

                                <button onClick={() => setAction({ type: "VIEW", payload: {} })}>
                                    <ArrowLeft />
                                </button>

                                <label className="mx-2 text-3xl text-slate-600">{valuesEdit?.businessName || valuesEdit?.title}</label>

                                <button className="bg-verde h-8 w-16 rounded-lg text-white" onClick={() => setAction({ type: "EDIT", payload: { _id: valuesEdit?._id } })}>Editar</button>
                            </div>

                            <label className="text-sm text-slate-600 ml-9">Resumen</label>
                        </div>


                        {(() => {
                            switch (slug) {
                                case "business":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroInfoSimple
                                                title={"Descripcion de la marca"}
                                                icon={<EditIcon />}
                                                info={valuesEdit?.description}
                                            />
                                            <CuadroMultiInfo
                                                title={"Ubicacion de la Marca"}
                                                icon={<EditIcon />}
                                                title1={"Pais"}
                                                label1={valuesEdit?.country}
                                                title2={"Ciudad"}
                                                label2={valuesEdit?.city}
                                                title3={"Direccion"}
                                                label3={valuesEdit?.address}
                                            />
                                            <CuadroContacto
                                                title={"Datos de contacto de tu marca"}
                                                icon={<EditIcon />}
                                                info={"Estos son los datos visibles de tu empresa que seran publicados en nuestra web"}
                                                contactIcon={<UserIcon />}
                                                contactLabel={valuesEdit?.contactName}
                                                emailIcon={<EmailIconn />}
                                                emailLabel={valuesEdit?.contactEmail}
                                                movilIcon={<PhoneMobile />}
                                                movilLabel={valuesEdit?.mobilePhone}
                                                webIcon={<WebSiteIcon />}
                                                webLabel={valuesEdit?.webPage}
                                            />
                                            <CuadroSocial
                                                title={"Datos de tus redes sociales"}
                                                icon={<EditIcon />}
                                                info={"Estas son las redes sociales de tu empresa visibles en la web"}
                                                facebookIcon={<FacebookIcon2 />}
                                                facebookLabel={valuesEdit?.facebook}
                                                instagramIcon={<InstagramIcon2 />}
                                                instagramLabel={valuesEdit?.instagram}
                                                linkedinIcon={<LinkedinI />}
                                                linkedinLabel={valuesEdit?.linkedin}
                                                twitterIcon={<TwitterIconI />}
                                                twitterLabel={valuesEdit?.twitter}
                                                whatsappIcon={<WhatsappIconI />}
                                                whatsappLabel={valuesEdit?.whatsapp}
                                                youtubeIcon={<YoutubeIconI />}
                                                youtubeLabel={valuesEdit?.youtube}
                                            />
                                            <CuadroImagenSmall
                                                title={"Identidad de tu marca "}
                                                imgLogo={valuesEdit?.imgLogo}
                                                imgMiniatura={valuesEdit?.imgMiniatura}
                                            />
                                            <CuadroImg
                                                title={"Galeria"}
                                                icon={<EditIcon />}
                                                imagee={imagee}
                                            />
                                        </div>
                                    );
                                    break
                                case "categoryBusiness":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Titulo y Slug de la categoria"}
                                                info={"Este es el titulo visible para el usuario y la ruta de la categoria"}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                            />

                                            <CuadroImagenSmall
                                                title={"Imagenes de tu marca"}
                                                icon={<EditIcon />}
                                                imgBanner={valuesEdit?.imgBanner}
                                                imgMiniatura={valuesEdit?.imgMiniatura}
                                                imgIcon={valuesEdit?.icon}
                                            />
                                        </div>
                                    );
                                    break
                                case "subcategoriesBusiness":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">

                                            <CuadroInfoSimple
                                                title={"Descripcion de la marca"}
                                                icon={<EditIcon />}
                                                info={valuesEdit?.description}
                                            />

                                            <CuadroTituloSlug
                                                title={"Titulo y Slug de la categoria"}
                                                info={"Este es el titulo visible para el usuario y la ruta de la categoria"}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                            />

                                            <CuadroImagenSmall
                                                title={"Imagenes de tu marca"}
                                                icon={<EditIcon />}
                                                imgBanner={valuesEdit?.imgBanner}
                                                imgMiniatura={valuesEdit?.imgMiniatura}
                                                imgIcon={valuesEdit?.icon ? valuesEdit?.icon : "null"}
                                            />


                                        </div>
                                    );
                                    break
                                case "characteristics":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Titulo de la caracteristicas"}
                                                info={"Este es el titulo visible para el usuario de la categoria"}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={""}
                                            />
                                            <CuadroItems
                                                title={"Elementos de la caracteristica"}
                                                info={"Estos son los elementos de la caracteristica"}
                                                tacs={valuesEdit?.items}
                                            />

                                        </div>
                                    );
                                    break
                                case "campañas":
                                    return (
                                        <></>
                                    );
                                    break
                                case "questions":
                                    return (
                                        <></>
                                    );
                                    break
                                case "posts":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Datos del post"}
                                                info={""}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                                seo={valuesEdit?.seoDescription}
                                                autor={valuesEdit?.authorUsername}

                                            />
                                            <CuadroInfoSimple
                                                title={"Vista previa del post"}
                                                icon={<EditIcon />}
                                                info={valuesEdit?.content}
                                            />

                                            <CuadroImagenSmall
                                                title={"Imagenes de tu marca"}
                                                icon={<EditIcon />}
                                                //imgBanner={valuesEdit?.imgBanner}
                                                imgMiniatura={valuesEdit?.imgMiniatura}
                                            //imgIcon={""}
                                            />

                                            <CuadroImg
                                                title={"Galeria"}
                                                icon={<EditIcon />}
                                                imagee={imagee}
                                            />
                                        </div>
                                    );
                                    break
                                case "categoriesPosts":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Datos del post"}
                                                info={""}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                                encabezado={valuesEdit?.heading}
                                            //seo={valuesEdit?.seoDescription}
                                            //autor={valuesEdit?.authorUsername}

                                            />
                                            <CuadroInfoSimple
                                                title={"Descripcion de la categoria"}
                                                icon={<EditIcon />}
                                                info={valuesEdit?.description}
                                            />

                                            <CuadroImagenSmall
                                                title={"Imagenes de tu marca"}
                                                icon={<EditIcon />}
                                                imgBanner={valuesEdit?.imgBanner}
                                                imgMiniatura={valuesEdit?.imgMiniatura}
                                                imgIcon={valuesEdit?.icon}
                                            />


                                        </div>
                                    );
                                    break
                                case "subcategoriesPost":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Datos del post"}
                                                info={""}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                                encabezado={valuesEdit?.heading}
                                            //seo={valuesEdit?.seoDescription}
                                            //autor={valuesEdit?.authorUsername}

                                            />
                                        </div>

                                    );
                                    break
                                case "sections":
                                    return (
                                        <div className="flex flex-col justify-center items-center gap-2">
                                            <CuadroTituloSlug
                                                title={"Datos de la pagina"}
                                                info={""}
                                                labelTitle={valuesEdit?.title}
                                                labelSlug={valuesEdit?.slug}
                                                encabezado={valuesEdit?.heading}
                                            />

                                            <CuadroInfoSimple
                                                title={"Informacion"}
                                                icon={<EditIcon />}
                                                info={valuesEdit?.content}
                                            />
                                        </div>
                                    );
                                    break
                            }
                        })()}

                    </div>
                </>
            ) : (
                <LoadingComponent />
            )}
        </Flex>
    );
};

