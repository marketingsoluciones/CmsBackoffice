import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, MenuButton, MenuItem, Menu, MenuList, Text, IconButton, Input, Center } from "@chakra-ui/react";
import Link from 'next/link';
import { useAuthentication } from "../utils/Authentication";
import { BombillaIcon, AddUserIcon, AyudaIcon, ArrowDownIcon, SearchIcon, CloseIcon } from "../components/Icons/index";
import algoliasearch from "algoliasearch";
import { InstantSearch, connectSearchBox, Hits, SearchBox } from "react-instantsearch-dom";
import { createURL } from "../utils/UrlImage"
import { AuthContextProvider } from "../context/AuthContext";
import ClickAwayListener from "react-click-away-listener";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import router from "next/router";



export const Navigation = ({ set, state, }) => {
  const { _signOut } = useAuthentication()
  const { user } = AuthContextProvider()
  const [show, setShow] = useState(false)
  


  const Options = [

    { title: "Ayuda", route: "/" },
    {
      title: "Cerrar Sesión", function: async () => {
        _signOut()

      }
    },

  ]

  return (
    <Flex bg={"white"} shadow={"sm"} w={"100%"} padding={"0.5rem"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"} gap={{ base: "1", md: "4" }} >
        <IconButton onClick={() => set(!state)}>
          <HamburgerIcon w={"1.5rem"} h={"1.5rem"} color={"gray.500"} />
        </IconButton>
        <Center w={{ base: `${show ? "100%" : "60%"}`, md: "60%" }}>
          <SearchNavigation show={show} setShow={setShow} />
        </Center>
        <Center gap={"2"}>
          <Menu >
            {screen.width > 764 ?
              <Text w={{ base: "5rem", sm: "10rem", md: "12rem" }} className="text-right truncate" textTransform={"capitalize"}>
                {user?.displayName}
              </Text>
              : !show ?
                <Text w={{ base: "5rem", sm: "10rem", md: "12rem" }} className="text-right truncate" textTransform={"capitalize"}>
                  {user?.displayName}
                </Text>
                : <></>
            }
            <MenuButton mr={"0.5rem"}>
              <Flex alignItems={"center"} gap={"0.5rem"}>
                <Avatar size={"sm"} />
              </Flex>
            </MenuButton>
            <MenuList p={"0"} fontSize={"sm"} ml={"8"}>
              {Options.map((item, idx) => (
                item.route ? (
                  <Link key={idx} href={item.route}>
                    <MenuItem color={"gray.500"}>{item.title}</MenuItem>
                  </Link>
                ) : (
                  <MenuItem key={idx} onClick={item?.function} color={"gray.500"}>{item.title}</MenuItem>
                )
              ))}
            </MenuList>
          </Menu>
        </Center>
        {/*  <div className="">
            <AyudaIcon className="" />
          </div>
          <div className="">
            <AddUserIcon />
          </div>
          <div className="">
            <BombillaIcon />
          </div> */}
      </Flex>
    </Flex>
  );
};

const MySearchBox = ({ currentRefinement, refine, show, setShow }) => {


  return (
    <>
      <ClickAwayListener onClickAway={() => refine("")}>
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
              if (e.target.value.length == 0) setShow(false)
              refine(e.currentTarget.value)
            }}
          />
          {show && <button className={`justify-end pr-2 `} onClick={() => {
            setShow(false)
            refine("")
          }}><CloseIcon /></button>}
        </div>
      </ClickAwayListener>
    </>
  );
};

export const SearchNavigation = ({ show, setShow }) => {
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
        />
        <div className={`absolute z-50 top-80px inset-x-0 left-0 w-[150%] md:w-[90%] mx-auto  bg-white shadow max-h-60 overflow-auto  rounded-b-3xl `}>
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
};

export const Hit = ({ hit, }) => {
  const { dispatch } = AuthContextProvider()
  return (
    <>
      <div className="gap-3 flex py-3 px-5  transition-all cursor-pointer items-center" /* onClick={() => {[router.push("/"+hit?.type) ,dispatch({ type: "EDIT", payload: { _id: hit.objectID } })] }} */>
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
            className={` text-sm   rounded  text-gray-500`}
          >
            {hit?.type}
          </span>
        </div>
      </div>
    </>
  );
};

export const ConnectedSearchBox = connectSearchBox(MySearchBox);