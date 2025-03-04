import { FC, useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Code } from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ThemeToggle from "../../utils/ThemeToggle";
import { Link as LucidLink, X, CircleArrowOutUpRight, FileSearch2, MessagesSquare } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/auth";
import { RootState, AppDispatch } from "../../redux/store";
interface NavLinkProps {
	to: string;
	text: string;
	onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}
const Logo = (text: any) => {
	if (text == "Resources") return <LucidLink size="15" />;
	if (text == "Resumes") return <FileSearch2 size="15" />;
	if (text == "Roadmap") return <CircleArrowOutUpRight size="15" />;
	if (text == "Help Desk") return <MessagesSquare size="13" />;
};
const NavLink: FC<NavLinkProps> = ({ to, text, onClick }) => (
	<Link
		className="group inline-flex gap-1 h-8 items-center rounded-md px-3 py-2 text-sm font-bold transition-colors hover:bg-[#7C3AED] hover:text-gray-50 focus:bg-[#7C3AED] focus:text-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-[#7C3AED] dark:hover:text-gray-50 dark:focus:bg-[#7C3AED] dark:focus:text-gray-50"
		to={to}
		target={to == "https://roadmap.sh" ? "_blank" : undefined}
		onClick={onClick}
	>
		{text}
		{Logo(text)}
	</Link>
);

interface PopupProps {
	onClose: () => void;
}

const Popup: FC<PopupProps> = ({ onClose }) => (
	<div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-black">
		<div className="bg-white p-8 rounded-lg shadow-md mt-16">
			<p className="mb-4 text-lg font-semibold">You need to be logged in to access this feature.</p>
			<div className="flex justify-end">
				<Button onClick={onClose}>Close</Button>
			</div>
		</div>
	</div>
);

// Main component

const Navbar: FC = () => {
	const [popupVisible, setPopupVisible] = useState<boolean>(false);
	const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user.data) || null;
	const dispatch = useDispatch<AppDispatch>();
	const handleLogout = async () => {
		try {
			await dispatch(signOut());
		} catch (error) {}
	};

	const handleLogin = () => {
		navigate("/login");
	};

	const handleNavLinkClick = () => {
		if (!user) {
			setPopupVisible(true);
		}
	};

	return (
		<header className="fixed top-0 z-50 w-full bg-[#8B5CF6] shadow-sm dark:bg-[#8B5CF6] dark:text-gray-50 h-14 md:h-12">
			<div className="container flex h-full items-center justify-between px-4 md:pl-2  md:pr-5">
				<Link className="flex items-center bg-white rounded-full p-1 " to="/">
					<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
						<Code className="h-5 w-5 text-white" />
					</div>
					<span className="text-lg font-bold text-black">CodeX</span>
				</Link>
				<nav className="hidden items-center gap-4 md:flex">
					<NavLink to="/resources" text="Resources" />
					<NavLink to={user ? "/chats" : "/login"} text="Help Desk" onClick={handleNavLinkClick} />
					<NavLink to={user ? "/resumes" : "/login"} text="Resumes" onClick={handleNavLinkClick} />
					<NavLink to="https://roadmap.sh" text="Roadmap" />
				</nav>
				<div className="flex gap-3">
					<div className="flex items-center">
						<ThemeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Avatar className="h-8 w-8 transition-transform duration-300 ease-in-out hover:scale-110">
									<AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
									<AvatarFallback>{user ? user.username.substring(0, 2) : "T"}</AvatarFallback>
									<span className="sr-only">Toggle user menu</span>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem className="flex items-center justify-center">
									{user ? <Button onClick={handleLogout}>Logout</Button> : <Button onClick={handleLogin}>Login</Button>}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="md:hidden">
						<button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border" onClick={() => setShowMobileNav(!showMobileNav)}>
							<Menu />
						</button>
					</div>
					{showMobileNav && (
						<aside className="fixed top-0 left-0 h-screen w-64 bg-gray-700 md:hidden shadow-md text-white">
							<div className="flex h-full flex-col justify-between py-4 px-4">
								<div>
									<div className="flex justify-between">
										<Link to="/" className="flex items-center mb-4">
											<div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
												<Code className="h-5 w-5 text-white" />
											</div>
											<span className="text-lg font-bold">CodeX</span>
										</Link>
										<button onClick={() => setShowMobileNav(!showMobileNav)}>
											<X />
										</button>
									</div>
									<nav className="flex flex-col gap-2">
										<NavLink to="/resources" text="Resources" />
										<NavLink to={user ? "/chats" : "/login"} text="Help Desk" onClick={handleNavLinkClick} />
										<NavLink to={user ? "/resumes" : "/login"} text="Resumes" onClick={handleNavLinkClick} />
										<NavLink to="https://roadmap.sh" text="Roadmap" />
									</nav>
								</div>
							</div>
						</aside>
					)}
				</div>
			</div>
			{showMobileNav && <div className="fixed top-0 left-60 w-full h-screen z-20 bg-opacity-50" onClick={() => setShowMobileNav(!showMobileNav)} />}
			{popupVisible && <Popup onClose={() => setPopupVisible(false)} />}
		</header>
	);
};

export default Navbar;
