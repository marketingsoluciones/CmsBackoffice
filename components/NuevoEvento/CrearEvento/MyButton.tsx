import { FC } from 'react';
interface propsMyButton {
  texto:any
  ischecked:any
  setCheck:any
 }

 const MyButton: FC <propsMyButton> = ({texto, ischecked, setCheck}) => {

  return (
    <div className='flex'>

      <button onClick={()=> setCheck(!ischecked)} className={`flex  ${ischecked ? "justify-star bg-rosa text-white" : " justify-end bg-slate-200 "} items-center gap-2 w-full py-2 px-2 rounded-xl`}>
        {texto}       
        <input type="checkbox" checked={ischecked}/>
      </button>
    </div>
  );
}

export default MyButton;

