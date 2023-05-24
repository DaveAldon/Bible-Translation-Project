//import './glassContainer.style.css'

export const GlassContainer = (props: { children: any }) => {
  return (
    <div className="flex w-fit rounded-md overflow-hidden border-[#767676] border-[1px] relative">
      <div className="w-40 h-40 rounded-full bg-[#fab5702f] absolute right-1/4"></div>
      <div className="backdrop-blur-lg bg-white/10">{props.children}</div>
    </div>
  )
}
