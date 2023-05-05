import { Avatar } from "@chakra-ui/react";

export const Seudonimo = ({ modal, setModal, listDown, setListDown, found,user }) => {

    return (
        <div className="bg-white rounded-2xl p-2.5 flex flex-col gap-2.5 items-start justify-start shrink-0 w-[250px] h-[104px] relative" style={{ boxShadow: "var(--_01-shadows-light-z-card-box-shadow, 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20))" }}>

            <div className="flex flex-col gap-[9px] items-center self-stretch shrink-0 relative" >

                <div className=" text-left relative flex-1 font-bold text-sm" >
                    Elija o cree su seudónimo
                </div>

                <div className="flex gap-2">

                    <div className="flex flex-row gap-[5px] items-center *justify-start shrink-0 relative">
                        <div >
                            {found?.icon ? found.icon : <Avatar h={"35px"} w={"35px"} />}
                        </div>


                        <div className="flex flex-col gap-0 items-start justify-center shrink-0 relative overflow-hidden">
                            <div
                                className=" cursor-default text-left relative w-[5.5rem] truncate"
                                style={{
                                    font: "var(--subtitle-2, 600 14px/22px 'Public Sans', sans-serif)",
                                }}
                            >
                               {found?.nombre? found.nombre: user.displayName }
                            </div>

                            <div className=" flex flex-row gap-0 items-start justify-start shrink-0 relative">
                                <svg
                                    className="shrink-0 relative overflow-visible"
                                    style={{}}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.6666 7.99992C14.6666 4.31992 11.6799 1.33325 7.99992 1.33325C4.31992 1.33325 1.33325 4.31992 1.33325 7.99992C1.33325 11.2266 3.62659 13.9133 6.66658 14.5333V9.99992H5.33325V7.99992H6.66658V6.33325C6.66658 5.04659 7.71325 3.99992 8.99992 3.99992H10.6666V5.99992H9.33325C8.96658 5.99992 8.66658 6.29992 8.66658 6.66658V7.99992H10.6666V9.99992H8.66658V14.6333C12.0333 14.2999 14.6666 11.4599 14.6666 7.99992Z"
                                        fill="black"
                                    />
                                </svg>

                                <div className="shrink-0 w-4 h-4 relative overflow-hidden">
                                    <svg
                                        className="absolute left-0.5 top-0.5 overflow-visible"
                                        style={{}}
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.33333 0H2.66667C1.95942 0 1.28115 0.280951 0.781048 0.781048C0.280951 1.28115 0 1.95942 0 2.66667V9.33333C0 10.0406 0.280951 10.7189 0.781048 11.219C1.28115 11.719 1.95942 12 2.66667 12H9.33333C10.0406 12 10.7189 11.719 11.219 11.219C11.719 10.7189 12 10.0406 12 9.33333V2.66667C12 1.95942 11.719 1.28115 11.219 0.781048C10.7189 0.280951 10.0406 0 9.33333 0Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5.99992 8.66659C6.70716 8.66659 7.38544 8.38563 7.88554 7.88554C8.38563 7.38544 8.66659 6.70716 8.66659 5.99992C8.66659 5.29267 8.38563 4.6144 7.88554 4.1143C7.38544 3.6142 6.70716 3.33325 5.99992 3.33325C5.29267 3.33325 4.6144 3.6142 4.1143 4.1143C3.6142 4.6144 3.33325 5.29267 3.33325 5.99992C3.33325 6.70716 3.6142 7.38544 4.1143 7.88554C4.6144 8.38563 5.29267 8.66659 5.99992 8.66659Z"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9.66667 3.00008C9.84348 3.00008 10.013 2.92984 10.1381 2.80482C10.2631 2.67979 10.3333 2.51023 10.3333 2.33341C10.3333 2.1566 10.2631 1.98703 10.1381 1.86201C10.013 1.73699 9.84348 1.66675 9.66667 1.66675C9.48986 1.66675 9.32029 1.73699 9.19526 1.86201C9.07024 1.98703 9 2.1566 9 2.33341C9 2.51023 9.07024 2.67979 9.19526 2.80482C9.32029 2.92984 9.48986 3.00008 9.66667 3.00008Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>

                                <svg
                                    className="shrink-0 relative overflow-visible"
                                    style={{}}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.2334 3.69991C9.72687 3.69983 9.2405 3.89857 8.87894 4.25339C8.51739 4.60821 8.30954 5.09076 8.30011 5.59725L8.28144 6.64725C8.28044 6.70368 8.26751 6.75926 8.2435 6.81034C8.21949 6.86142 8.18494 6.90684 8.14212 6.94361C8.0993 6.98038 8.04918 7.00768 7.99507 7.0237C7.94095 7.03973 7.88405 7.04411 7.82811 7.03658L6.78678 6.89458C5.41811 6.70791 4.10611 6.07791 2.84678 5.02925C2.44878 7.23591 3.22678 8.76458 5.10211 9.94391L6.26678 10.6759C6.32202 10.7107 6.36792 10.7584 6.40048 10.815C6.43304 10.8715 6.45126 10.9352 6.45356 11.0004C6.45586 11.0656 6.44217 11.1304 6.41368 11.1891C6.38519 11.2478 6.34277 11.2987 6.29011 11.3372L5.22878 12.1132C5.86011 12.1532 6.45945 12.1252 6.95678 12.0266C10.1021 11.3986 12.1934 9.03191 12.1934 5.12791C12.1934 4.80925 11.5181 3.69991 10.2334 3.69991ZM6.96678 5.57325C6.97841 4.93061 7.17937 4.30569 7.54448 3.77673C7.9096 3.24776 8.42264 2.83826 9.01939 2.59949C9.61613 2.36072 10.2701 2.3033 10.8993 2.43441C11.5285 2.56552 12.1051 2.87934 12.5568 3.33658C13.0308 3.33325 13.4341 3.45325 14.3354 2.90591C14.1128 3.99925 14.0021 4.47458 13.5268 5.12725C13.5268 10.2212 10.3954 12.6992 7.21744 13.3332C5.03944 13.7679 1.87078 13.0539 0.964111 12.1052C1.42611 12.0699 3.30611 11.8679 4.39278 11.0719C3.47278 10.4652 -0.185889 8.31191 2.21878 2.52391C3.34744 3.84191 4.49211 4.73858 5.65211 5.21525C6.42344 5.53191 6.61344 5.52525 6.96744 5.57391L6.96678 5.57325Z"
                                        fill="black"
                                    />
                                </svg>

                                <svg
                                    className="shrink-0 relative overflow-visible"
                                    style={{}}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.7 3.27329C12.0888 2.65591 11.3608 2.1664 10.5585 1.83333C9.7561 1.50025 8.89544 1.33027 8.0267 1.33329C4.3867 1.33329 1.42003 4.29996 1.42003 7.93996C1.42003 9.10662 1.7267 10.24 2.30003 11.24L1.3667 14.6666L4.8667 13.7466C5.83337 14.2733 6.92003 14.5533 8.0267 14.5533C11.6667 14.5533 14.6334 11.5866 14.6334 7.94662C14.6334 6.17996 13.9467 4.51996 12.7 3.27329ZM8.0267 13.4333C7.04003 13.4333 6.07337 13.1666 5.2267 12.6666L5.0267 12.5466L2.9467 13.0933L3.50003 11.0666L3.3667 10.86C2.81853 9.9846 2.52746 8.97279 2.5267 7.93996C2.5267 4.91329 4.99337 2.44663 8.02003 2.44663C9.4867 2.44663 10.8667 3.01996 11.9 4.05996C12.4117 4.56927 12.8172 5.17507 13.093 5.84224C13.3688 6.50942 13.5094 7.2247 13.5067 7.94662C13.52 10.9733 11.0534 13.4333 8.0267 13.4333ZM11.04 9.32662C10.8734 9.24662 10.06 8.84663 9.91337 8.78663C9.76003 8.73329 9.65337 8.70663 9.54003 8.86663C9.4267 9.03329 9.11337 9.40663 9.02003 9.51329C8.9267 9.62663 8.8267 9.63996 8.66003 9.55329C8.49337 9.47329 7.96003 9.29329 7.33337 8.73329C6.84003 8.29329 6.51337 7.75329 6.41337 7.58662C6.32003 7.41996 6.40003 7.33329 6.4867 7.24662C6.56003 7.17329 6.65337 7.05329 6.73337 6.95996C6.81337 6.86662 6.8467 6.79329 6.90003 6.68662C6.95337 6.57329 6.9267 6.47996 6.8867 6.39996C6.8467 6.31996 6.51337 5.50663 6.38003 5.17329C6.2467 4.85329 6.1067 4.89329 6.0067 4.88663H5.6867C5.57337 4.88663 5.40003 4.92663 5.2467 5.09329C5.10003 5.25996 4.67337 5.65996 4.67337 6.47329C4.67337 7.28663 5.2667 8.07329 5.3467 8.17996C5.4267 8.29329 6.51337 9.95996 8.1667 10.6733C8.56003 10.8466 8.8667 10.9466 9.1067 11.02C9.50003 11.1466 9.86003 11.1266 10.1467 11.0866C10.4667 11.04 11.1267 10.6866 11.26 10.3C11.4 9.91329 11.4 9.58663 11.3534 9.51329C11.3067 9.43996 11.2067 9.40662 11.04 9.32662Z"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-[5px] items-center *justify-start shrink-0 relative">
                        <div className="cursor-pointer" onClick={() => setListDown(!listDown)}>
                            <svg
                                className="rounded-lg shrink-0 relative overflow-visible"
                                style={{}}
                                width="24"
                                height="26"
                                viewBox="0 0 24 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_442_11570)">
                                    <rect
                                        y="0.5"
                                        width="24"
                                        height="25"
                                        rx="8"
                                        fill="white"
                                        shapeRendering="crispEdges"
                                    />
                                    <path
                                        d="M15.88 10.177L12 14.2187L8.11998 10.177C7.72998 9.77075 7.09998 9.77075 6.70998 10.177C6.31998 10.5833 6.31998 11.2395 6.70998 11.6458L11.3 16.427C11.69 16.8333 12.32 16.8333 12.71 16.427L17.3 11.6458C17.69 11.2395 17.69 10.5833 17.3 10.177C16.91 9.78117 16.27 9.77075 15.88 10.177V10.177Z"
                                        fill="#14532D"
                                    />
                                    <rect
                                        x="0.25"
                                        y="0.75"
                                        width="23.5"
                                        height="24.5"
                                        rx="7.75"
                                        stroke="#047857"
                                        strokeWidth="0.5"
                                        shapeRendering="crispEdges"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_442_11570"
                                        x="0"
                                        y="0.5"
                                        width="28"
                                        height="29"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_442_11570"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_442_11570"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>

                        <div className="rounded-lg flex flex-row gap-[5px] items-center justify-start shrink-0 relative">
                            <svg
                                className="rounded-lg p-[5px] flex flex-row gap-2.5 items-start justify-start shrink-0 relative overflow-visible"
                                style={{}}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_442_13012)">
                                    <rect
                                        width="24"
                                        height="24"
                                        rx="8"
                                        fill="white"
                                        shapeRendering="crispEdges"
                                    />
                                    <path
                                        d="M13.441 7.18265L15.3765 5.24714C15.5348 5.0889 15.7494 5 15.9733 5C16.1971 5 16.4117 5.0889 16.57 5.24714L18.7529 7.42997C18.9111 7.58826 19 7.80292 19 8.02675C19 8.25057 18.9111 8.46523 18.7529 8.62352L16.8173 10.559M13.441 7.18265L5.24732 15.3763C5.08901 15.5346 5.00005 15.7492 5 15.9731V18.1559C5 18.3798 5.08893 18.5945 5.24723 18.7528C5.40553 18.9111 5.62023 19 5.8441 19H8.02693C8.25078 19 8.46544 18.911 8.62371 18.7527L16.8173 10.559M13.441 7.18265L16.8173 10.559"
                                        stroke="#14532D"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="0.25"
                                        y="0.25"
                                        width="23.5"
                                        height="23.5"
                                        rx="7.75"
                                        stroke="#047857"
                                        strokeWidth="0.5"
                                        shapeRendering="crispEdges"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_442_13012"
                                        x="0"
                                        y="0"
                                        width="28"
                                        height="28"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dx="2" dy="2" />
                                        <feGaussianBlur stdDeviation="1" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_442_13012"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_442_13012"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </div>

                        <div
                            onClick={() => setModal(!modal)}
                            className="bg-[#ffffff] cursor-pointer rounded-lg border-solid border-green-700 border-[0.5px] p-[5px] flex flex-row gap-2.5 items-center justify-center shrink-0 w-6 h-6 relative"
                            style={{ boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
                        >
                            <svg
                                className="shrink-0 relative overflow-visible"
                                style={{}}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_442_11573)">
                                    <path
                                        d="M5.9999 0.462891V11.6057M0.428467 6.00003H11.5713"
                                        stroke="#14532D"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_442_11573">
                                        <rect width="12" height="12" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

/* Code generated with AutoHTML Plugin for Figma */

