import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email or password is missing");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return;
    }
    
    try {
      const response = await axios.post("https://rushika.onrender.com/auth", {
        email, 
        password
      });

      if (response.status  === 200) {
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Local login success");
        navigate("/home");
      }
  
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://rushika.onrender.com", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-4 text-black-600 text-4xl">
          <span>👤</span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-black-700">
          HRMS Login
        </h2>

        <label className="block text-gray-600 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="block text-gray-600 text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-green-700 hover:text-black transition hover:cursor-pointer text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}





import { useState } from "react"
import axios from "axios"

export default function Login(){

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = async(e)=>{
   e.preventDefault()

   try{
     const res = await axios.post("http://localhost:5000/api/auth/login",{
       email,
       password
     })

     localStorage.setItem("token",res.data.token)

     alert("Login successful")

   }catch(err){
     console.log(err)
   }
 }

 return(
   <div>
     <h2>Login</h2>

     <form onSubmit={handleLogin}>

       <input
       type="email"
       placeholder="Email"
       onChange={(e)=>setEmail(e.target.value)}
       />

       <br/>

       <input
       type="password"
       placeholder="Password"
       onChange={(e)=>setPassword(e.target.value)}
       />

       <br/>

       <button type="submit">Login</button>

     </form>

   </div>
 )

}