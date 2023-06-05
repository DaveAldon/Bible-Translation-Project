export const InfoCard = (props: { icon: string; title: string }) => {
  return (
    <div className="border-gray-400 flex flex-row select-none bg-gray-800 rounded-md flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col rounded-md w-10 h-10 bg-gray-900 justify-center items-center mr-4">
        {props.icon}
      </div>
      <div className="flex-1 pl-1 mr-16">
        <div className="font-medium">{props.title}</div>
      </div>
    </div>
  )
}
