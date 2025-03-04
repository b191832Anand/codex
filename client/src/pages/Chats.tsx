import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, CircleUserRound } from "lucide-react";
import { FC } from "react";
import { addMessage } from "../redux/slices/message";
import { RootState, AppDispatch } from "../redux/store";
const Chats: FC = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const messages = useSelector((state: RootState) => state.messages.data);
    const user = useSelector((state: RootState) => state.user.data);
    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        await dispatch(addMessage(text));
        setText("");
    };

    return (
        <>
            <div className=" mt-16 flex flex-col md:mx-20 h-[90%] mb-24">
                <div className="flex-1 h-full p-4 bg-gray-100 dark:bg-gray-950">
                    <div className="grid gap-4 animate-fade-in">
                        {messages &&
                            messages.length > 0 &&
                            messages.map((message) =>
                                user?._id == message.userId ? (
                                    <div key={message._id} className="flex items-start gap-3 justify-end animate-slide-in-right">
                                        <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%] shadow-md transition-all duration-300 hover:shadow-lg">
                                            <span className="flex gap-2">
                                                <CircleUserRound />
                                                <p className="text-lg">{message.username}</p>
                                            </span>
                                            <p className="text-lg text-black">{message.text}</p>
                                            <div className="text-xs text-black mt-1">{new Date(message.date).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={message._id} className="flex items-start gap-3 animate-slide-in-left">
                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%] shadow-md transition-all duration-300 hover:shadow-lg">
                                            <span className="flex gap-2">
                                                <CircleUserRound />
                                                <p className="text-lg">{message.username}</p>
                                            </span>
                                            <p className="text-lg text-black">{message.text}</p>
                                            <div className="text-xs text-black mt-1">{new Date(message.date).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })}</div>
                                        </div>
                                    </div>
                                ),
                            )}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="bg-gray-100 mx-auto  dark:bg-gray-950 fixed w-[80%] items-center justify-center flex bottom-4">
                    <form onSubmit={handleSendMessage} className="w-full flex">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                            className="flex-1 bg-white border-2 rounded-lg border-sky-500 dark:bg-gray-800 rounded-lg px-4  text-sm shadow-sm transition-all duration-300 focus:shadow-md"
                        />
                        <Button variant="ghost" size="icon" onClick={handleSendMessage} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            <Send className="h-5 w-5 animate-bounce" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Chats;
