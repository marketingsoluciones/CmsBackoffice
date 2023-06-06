export const Popup = ({ title, arrow }) => {
  // console.log(props?.className?.split(" ")?.filter(elem => elem?.split("-")[0] === "arrow")[0])
  return (
    <div className={`popup arrow-${arrow}`} >
      <div className="popup-wrapper rounded-md text-white text-[11px] p-1 ">
        <span className="capitalize" >{title}</span>
      </div>
    </div>
  )
}