import { react, useState } from "react";
import { SendHorizontal } from "lucide-react";
const ChatInput = () => {
  const [text, setText] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const message = {
      text: text.trim(),
    };

    // Clear input fields before sending the message
    setText("");

    try {
      //   await sendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={!text.trim()}
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
