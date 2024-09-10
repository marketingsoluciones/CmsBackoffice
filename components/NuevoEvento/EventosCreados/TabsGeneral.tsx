import React, { FC } from 'react';
import CalendarioTabs from './Canlendariotabs';
import CrmComponent from './CrmComponent';
import InformesTabs from './InformesTabs';
import AjustesTabs from './AjustesTabs';

interface TabButtonProps {
  selected: boolean;
  onClick: () => void;
  iconSrc: string;
  label: string;
}
interface propsTabsGeneral {
    componentState: any;
    setComponentState: any;
  
  }

const TabButton1: FC <TabButtonProps> = ({ selected, onClick, iconSrc, label }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-button ${
        selected
          ? 'flex flex-row gap-2 rounded-full h-full items-center justify-center py-[10px] px-[10px] border-b-[2px] border-solid text-black text-sm bg-pink-200 font-semibold'
          : 'flex flex-row gap-2 rounded-full h-full items-center justify-center text-sm py-[10px] px-[10px] bg-white text-gray-600 hover:bg-slate-200'
      }`}
    >
      <div
        className={`tab-icon ${
          selected
            ? 'w-7 h-7 rounded-full bg-rosa flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border'
            : 'w-7 h-7 rounded-full bg-gray-600 flex flex-row items-center justify-center py-[7px] pr-[7.869999885559082px] pl-[7.880000114440918px] box-border hover:bg-gray-400'
        }`}
      >
        <img className="h-3.5 w-[12.3px] relative overflow-hidden shrink-0" alt="" src={iconSrc} />
      </div>
      {selected && label}
    </button>
  );
};

const TabsGeneral: FC <propsTabsGeneral> = ({componentState, setComponentState}) => {
  const [selectedTab, setSelectedTab] = React.useState('Calendario');

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start py-0 pr-[22px] pl-5 gap-6 box-border shrink-0">

    <div className="flex space-x-2">
      <TabButton1
        selected={selectedTab === 'Calendario'}
        onClick={() => handleTabChange('Calendario')}
        iconSrc="ModuloEvento/icon-15.svg"
        label="Calendario"
      />
      <TabButton1
        selected={selectedTab === 'CRM'}
        onClick={() => handleTabChange('CRM')}
        iconSrc="ModuloEvento/crm.svg"
        label="CRM"
      />
            <TabButton1
        selected={selectedTab === 'Informes'}
        onClick={() => handleTabChange('Informes')}
        iconSrc="ModuloEvento/icon-22.svg"
        label="Informes"
      />
                  <TabButton1
        selected={selectedTab === 'Ajustes'}
        onClick={() => handleTabChange('Ajustes')}
        iconSrc="ModuloEvento/icon123.svg"
        label="Ajustes"
      />
    </div>

          <div className="w-[100%] h-[100%] mt-4">
          {selectedTab === 'Calendario' && <CalendarioTabs componentState={componentState} setComponentState={setComponentState}/>}
          {selectedTab === 'CRM' && <CrmComponent componentState={componentState} setComponentState={setComponentState}/>}
          {selectedTab === 'Informes' && <InformesTabs componentState={componentState} setComponentState={setComponentState}/>}
          {selectedTab === 'Ajustes' && <AjustesTabs componentState={componentState} setComponentState={setComponentState}/>}
        </div>
        </div>
  );
};

export default TabsGeneral;
