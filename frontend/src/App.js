import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import { useEffect, useState } from "react";
import Comments from "./Components/Coments";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  },[]);
  return (
   <>
   <Navbar/>
   <main className="h-screen">
    {
      data.map((item) => (    

        <Comments key={item.id} name = {item.attributes.userName} comment={item.attributes.comment} date={item.attributes.updatedAt}/>
      ))
    }
   </main>
   <Footer/>
   </> 
  )
}

export default App