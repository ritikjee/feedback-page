import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { getRoleFromCookie ,getTokenFromCookie} from "../lib/auth";
function Comments({name,comment,date,id}) {
    const [edit , setEdit] = useState(false)
    const [editComment , setEditComment] = useState(comment);

    const handleChange = (e) => {
        setEditComment(e.target.value)
    }

    const handleUpdate = () => {
        try{
            fetch(`http://localhost:1337/api/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify({data:{
                    comment:editComment
                }}),
            }).then(() => {
                window.location.href = "/"
            })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleDelete = () => {
        try{
            fetch(`http://localhost:1337/api/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
            }).then(() => {
                window.location.href = "/"
            })
        }
        catch(err){
            console.log(err)
        }
    }

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
                    {(getRoleFromCookie()==='true')&&
                    <div className="flex gap-2 items-center">
                    <span><MdDelete className="text-2xl hover:cursor-pointer"
                    onClick={()=>{
                        handleDelete()
                    }
                    }
                    /></span>
                    <span><FaEdit className="text-2xl hover:cursor-pointer"
                    onClick={()=>{
                        setEdit(!edit)
                    }}
                    /></span>
                    </div>
  }
                </div>

                {!edit?<div>
                    {comment}
                </div>:
                <div>
                    <textarea placeholder="enter text" className="w-full" onChange={handleChange} value={editComment}></textarea>
                </div>
                }
                {
                    edit&&
                    <div  className="flex items-center  justify-start gap-5">
                        <button
                        className="hover:cursor-pointer bg-black text-white p-2 rounded-xl"
                        onClick={()=>{
                            setEdit(false)
                        }}>Cancel</button>
                        <button
                        onClick={handleUpdate}
                        className="hover:cursor-pointer bg-black text-white p-2 rounded-xl"
                        >
                            Update
                        </button>
                    </div>
                }
                <div>
                    <span className="text-gray-400">{dateStr}</span>
                </div>
            </div>
    </>
  )
}

export default Comments