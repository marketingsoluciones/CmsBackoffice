import { FC } from "react";
import { useRouter } from 'next/router';

export const BreadCumbs: FC = () => {
  const router = useRouter()

  const pathNames = window.location.pathname.split("/").filter(item => item !== '')

  const handleOnClick = (idx: number) => {
    const path = `/${pathNames.slice(0, idx + 1).join("/")}`
    router.push(path)
  }

  return (
    <div className="flex-1">
      <nav className="flex w-full" aria-label="Breadcrumb">
        <ol className="inline-flex list-none">
          {pathNames?.map((item, idx) =>
            <li key={idx} className="inline-flex items-center text-gray-800">
              <span className="mr-2 text-xl">{">"}</span>
              <span onClick={() => { handleOnClick(idx) }} className="mr-2 cursor-pointer text-sm">{item}</span>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};
