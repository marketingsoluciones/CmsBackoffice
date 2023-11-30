import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Flex, MenuButton, Menu, MenuList, Text, IconButton, Center, Image } from "@chakra-ui/react";
import Link from 'next/link';
import { useAuthentication } from "../utils/Authentication";
import { SearchIcon, CloseIcon, TarjetaIcon, UserMenuIcon, RegaloIcon, SalirIcon, CorazonPaddinIcon, RedireccionIcon } from "../components/Icons/index";
import algoliasearch from "algoliasearch";
import { InstantSearch, connectSearchBox, Hits } from "react-instantsearch-dom";
import { createURL } from "../utils/UrlImage"
import { AuthContextProvider } from "../context/AuthContext";
import ClickAwayListener from "react-click-away-listener";
import { useEffect, useState } from "react";
import router from "next/router";
import packageJson from "../package.json";
import { hasRole } from "../utils/auth";
import Cookies from "js-cookie";

export const Navigation = ({ set, state, }) => {
  const { _signOut } = useAuthentication()
  const { user } = AuthContextProvider()
  const [show, setShow] = useState(false)
  const [showValir, setShowValir] = useState(false)
  const cookieContent = JSON.parse(Cookies.get("guestbodas") ?? "{}")


  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShowValir(true)
      }, 900);
    }
  }, [show])

  const Options = [
    {
      title: " Mi Cuenta",
      children: [
        {
          icon: <UserMenuIcon />,
          title: "Preferencias personales",
          rout: "/preferenciasPersonales"
        },
        {
          icon: <RegaloIcon />,
          title: "Programa de recomendación",
          rout: "/programaRecomendaciones"
        }
      ]
    },
    {
      title: " Resumen de la empresa",
      children: [
        {
          icon: <TarjetaIcon />,
          title: "Facturación",
          rout: "/facturacion"
        },

      ]
    },
    {
      title: "",
      children: [
        {
          icon: <CorazonPaddinIcon />,
          title: "Volver a Bodasdehoy.com",
          rout: window.origin.includes("://test") ? process.env.NEXT_PUBLIC_DIRECTORY?.replace("//", "//test.") : process.env.NEXT_PUBLIC_DIRECTORY
        },
        {
          icon: <RedireccionIcon/>,
          title: "Ir a AppBodasdehoy.com",
          rout:  window.origin.includes("://test.") ? process.env.NEXT_PUBLIC_EVENTSAPP?.replace("//", "//test") ?? "" : process.env.NEXT_PUBLIC_EVENTSAPP ?? " "
        },
        {
          icon: <SalirIcon />,
          title: "Cerrar Sesión", function: async () => {
            _signOut()
          }
        },
      ]
    },
  ]


  return (
    <Flex bg={"white"} shadow={"sm"} w={"100%"} padding={"0.5rem"} className="z-50" >
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"} gap={{ base: "1", md: "4" }} >
        <IconButton onClick={() => set(!state)}>
          <HamburgerIcon w={"1.5rem"} h={"1.5rem"} color={"gray.500"} />
        </IconButton>
        <Center w={{ base: `${show ? "100%" : "50%"}`, md: "50%" }}>
          <SearchNavigation show={show} setShow={setShow} showValir={showValir} setShowValir={setShowValir} />
        </Center>
        <Center gap={"2"} >
          <Menu >
            <MenuButton mr={"0.5rem"}>
              <Flex gap={"2"} >
                <Center >
                  {screen.width > 764 ?
                    <Text className="text-right truncate" textTransform={"capitalize"}>
                      {user?.displayName}
                    </Text>
                    : !show ?
                      <Text className="text-right truncate" textTransform={"capitalize"}>
                        {user?.displayName}
                      </Text>
                      : <></>
                  }
                </Center>
                <Flex alignItems={"center"} gap={"0.5rem"}>
                  {user?.photoURL ?
                    <Flex w={"32px"} h={"32px"} borderColor={"gray.400"} rounded={"full"} isTruncated>
                      <Image width={"32px"} height={"32px"} layout="intrinsic" src={user?.photoURL} objectFit="contain" objectPosition={"center"} />
                    </Flex>
                    : <Avatar h={"32px"} w={"32px"} />
                  }
                </Flex>
              </Flex>
            </MenuButton>
            <MenuList p={"0"} fontSize={"sm"} ml={"8"}>
              {Options?.map((item, idx) => (

                <div key={idx} className="border-b space-y-1  px-5 py-2">
                  <div className="flex items-center font-semibold ">
                    {item?.icon}
                    {item?.title}
                  </div>
                  {
                    item.children?.map((item, idx) => (
                      item.rout ? (
                        <Link key={idx} href={item?.rout} >
                          <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded-md px-1 py-0.5 ">
                            <div >
                              {item.icon}
                            </div>
                            <div>
                              {item.title}
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div key={idx} onClick={item?.function} className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100  rounded-md  px-1 py-0.5">
                          <div >
                            {item.icon}
                          </div>
                          <div>
                            {item.title}
                          </div>
                        </div>
                      )

                    ))}
                </div >
              ))}
              <div className="flex justify-center text-gray-400 py-0.5">
                Version: {packageJson?.version}
              </div>
            </MenuList>
          </Menu>
        </Center>
      </Flex>
    </Flex>
  );
};

const MySearchBox = ({ currentRefinement, refine, show, setShow, setShowValir }) => {
  return (
    <>
      <ClickAwayListener onClickAway={() => {
        /* refine("") */
        setShow(false)
        setShowValir(false)
      }}>
        <div className={`bg-white transition-all  flex jistify-center items-center  w-full border-gray-200 border-2 rounded-md py-1 text-gray-600`}>
          <div className="ml-2">
            <SearchIcon />
          </div>
          <input
            autoFocus
            className="w-full h-full focus:outline-none text-sm pl-2"
            placeholder="Buscar "
            type="input"
            value={currentRefinement}
            onChange={(e) => {
              if (!show && e.target.value.length > 0) setShow(true)
              if (e.target.value.length == 0) [setShow(false), setShowValir(false)]
              refine(e.currentTarget.value)
            }}
          />
          {show && <button className={`justify-end pr-2 `} onClick={() => {
            refine("")
            setShow(false)
            setShowValir(false)
          }}><CloseIcon /></button>}
        </div>
      </ClickAwayListener>
    </>
  );
};

export const SearchNavigation = ({ show, setShow, showValir, setShowValir }) => {
  const conditionalQuery = {
    search(requests) {
      if (
        requests.every(({ params }) => !params.query) ||
        requests.every(({ params }) => !params.query.trim())
      ) {
        // Here we have to do something else
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        });
      }
      const searchClient = algoliasearch(
        "4YG7QHCVEA",
        "920a6487923dbae05fb89b1be0955e74"
      );
      return searchClient.search(requests);
    },
  };

  return (
    <div className="flex items-center w-full justify-between relative ">
      <InstantSearch
        indexName="bodasdehoy"
        searchClient={conditionalQuery}
        stalledSearchDelay={50}
      >
        <ConnectedSearchBox
          searchAsYouType={false}
          show={show}
          setShow={setShow}
          setShowValir={setShowValir}
        />
        <div className={`absolute z-50 top-80px inset-x-0 left-0 w-[150%] md:w-[90%] mx-auto  bg-white shadow ${show ? "h-60" : "h-0"} overflow-auto  rounded-b-3xl `}>
          {showValir && <span className="absolute top-2 left-2 z-0 text-sm text-gray-600">No hay coincidencias</span>}
          <div className="relative bg-white">
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export const Hit = ({ hit }) => {
  const colors = {
    business: {
      color: "bg-rose-500",
      title: "Empresa",
      slug: "/business/",
    },
    categorybusiness: {
      color: "bg-gray-500",
      title: "Categoria de empresas",
      slug: "/categoryBusiness/",
    },
    subcategorybusiness: {
      color: "bg-green-500",
      title: "Subcategoria de empresas",
      slug: "/subcategoriesBusiness/",
    },
    post: {
      color: "bg-blue-500",
      title: "Post",
      slug: "/posts/",
    },
    categorypost: {
      color: "bg-orange-500",
      title: "Categoria de post",
      slug: "/categoriesPosts/",
    },
    subcategorypost: {
      color: "bg-yellow-500",
      title: "Subcategoria de post",
      slug: "/subcategoriesPost/",
    },
  };
  const { dispatch, development, user } = AuthContextProvider()
  const show = hasRole(development, user, ["admin", "edit"]) || hit.uid === user.uid ? true : false
  return (
    <>
      {show && <div className={`gap-3 flex py-3 px-5  transition-all cursor-pointer items-center`}
        onClick={async () => {
          await router.push(colors[hit?.type]?.slug)
            .then(async () => {
              await dispatch({ type: "EDIT", payload: { _id: hit.objectID } })
            })
        }
        } >
        <img
          alt={hit?.title}
          src={
            hit?.image ? createURL(hit?.image ?? "") : "/placeholder/image.png"
          }
          className={"w-14 h-14 rounded-lg object-cover object-center"}
        />
        <div className="col-span-3">
          <h3 className="text-sm md:text-sm font-semibold text-gray-500">
            {hit?.title}
          </h3>
          <span
            className={`${colors[hit?.type]?.color
              } text-xs text-white px-2 rounded`}
          >
            {colors[hit?.type]?.title}
          </span>
        </div>
      </div>}
    </>
  );
};

export const ConnectedSearchBox = connectSearchBox(MySearchBox);