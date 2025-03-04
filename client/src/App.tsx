import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LogInForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import HomePage from "./pages/HomePage";
import Resources from "./pages/Resources";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./redux/slices/blog";
import { getMessages } from "./redux/slices/message";
import { getResumes } from "./redux/slices/resume";
import { updateUser } from "./redux/slices/auth";
import Chats from "./pages/Chats";
import Resumes from "./pages/Resumes";
import { useEffect } from "react";
import { RootState, AppDispatch } from "./redux/store";
const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.data);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    dispatch(updateUser(JSON.parse(storedUser).user));
                }
                dispatch(getPosts());
                if (storedUser) await Promise.all([dispatch(getResumes()), dispatch(getMessages())]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        // Fetch data initially
        fetchData();
        // Fetch data every 5 seconds
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LogInForm />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/chats" element={user && <Chats />} />
                <Route path="/resumes" element={user && <Resumes />} />
            </Routes>
            <Navbar />
            <Toaster position="top-center" />
            {/* Optional button for testing */}
            {/* <button className="mt-16" onClick={() => dispatch(getPosts())}>
                Fetch Posts
            </button> */}
        </>
    );
};

export default App;
