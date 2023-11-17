import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Comments from '../Components/Comments'
import { getIdFromCookie ,getUserFromCookie,getTokenFromCookie} from "../lib/auth";
import { Link } from "react-router-dom";
function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [commentData, setCommentData] = useState(
        {
            userName: getUserFromCookie(),
            comment: ""
        }
    );

    const handleChange = (e) => {
        setCommentText(e.target.value)
        setCommentData({
            ...commentData,
            comment: e.target.value
        })

    }
    const handleSubmit = () => {
        try {
            fetch("http://localhost:1337/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify({data:commentData}),
            }).then(() => {
                window.location.href = "/"
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            const response = await fetch("http://localhost:1337/api/comments");
            const data = await response.json();
            setData(data.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {
                    data.map((item) => (

                        <Comments key={item.id} id={item.id} name={item.attributes.userName} comment={item.attributes.comment} date={item.attributes.updatedAt} />
                    ))
                }

                {getIdFromCookie() ?
                    <div className="flex flex-col items-center">
                        <div>

                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                            <textarea id="message" rows="4" name="comment" value={commentText} onChange={(e) =>
                                handleChange(e)
                            } className="block p-2.5 sm:w-[500px]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                        </div>
                        <button className="bg-black text-white font-bold p-2 my-10 rounded-lg" onClick={handleSubmit} >Add comment</button>
                    </div> :
                    <h1 className="text-xl flex flex-col items-center my-10 ">
                        Please login or register to comment
                        <div className="flex  gap-10 py-5">
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                            <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
                        </div>
                    </h1>
                }
            </main>
            <Footer />
        </>
    )
}

export default Home