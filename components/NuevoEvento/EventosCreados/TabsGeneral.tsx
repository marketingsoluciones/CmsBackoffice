import React, { FC, useEffect, useState } from 'react';
import CalendarioTabs from './Canlendariotabs';
import CrmComponent from './CrmComponent';
import InformesTabs from './InformesTabs';
import AjustesTabs from './AjustesTabs';
import { ButtonUnroll } from '../../Events/ButtonUnroll';
import { DataComponents } from '../../../utils/Interfaces';
import { useRouter } from 'next/router';

interface propsTabsGeneral {
  componentState: any;
  setComponentState: any;
  dataComponents: DataComponents[]
}

const TabsGeneral: FC<propsTabsGeneral> = ({ componentState, setComponentState, dataComponents }) => {
  const [optionSelect, setOptionSelect] = useState(0);
  const router = useRouter()

  useEffect(() => {
    console.log(1005, router.query.slug)
    const f1 = dataComponents.findIndex(elem => elem.slug === `/${router.query.slug[1]}`)
    if (f1 > -1) {
      setOptionSelect(f1)
    } else {
      router.push(`/${router.route.split("/")[1]}/${router.query.slug[0]}${dataComponents[0].slug}`)
    }
  }, [router])

  const [selectedTab, setSelectedTab] = React.useState('Calendario');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">
      <div className="flex space-x-2">
        {dataComponents?.map((elem, idx) =>
          <ButtonUnroll
            key={idx}
            selected={elem.slug === `/${router.query.slug[1]}`}
            onClick={() => router.push(`/${router.route.split("/")[1]}/${router.query.slug[0]}${elem.slug}`)}
            icon={elem.icon}
            label={elem.title}
          />
        )

        }
      </div>

      <div className="w-[100%] h-[100%] mt-4">
        {dataComponents[optionSelect].component}
      </div>
    </div>
  );
};

export default TabsGeneral;
