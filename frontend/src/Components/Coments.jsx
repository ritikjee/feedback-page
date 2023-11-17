
function Comments({name,comment,date}) {
    const dateObj = new Date(date)
    const dateStr = dateObj.toDateString()
    const fl = name.charAt(0).toUpperCase()
  return (
    <>
    <div className="flex flex-col gap-4 bg-gray-100 p-4 m-5">
                {/* <!-- Profile and Rating --> */}
                <div className="flex justify justify-between">
                    <div className="flex gap-2">
                        <div className="w-7 h-7 text-center rounded-full bg-red-500">{fl}</div>
                        <span>{name}</span>
                    </div>
                    
                </div>

                <div>
                    {comment}
                </div>

                <div>
                    <span className="text-gray-400">{dateStr}</span>
                </div>
            </div>
    </>
  )
}

export default Comments