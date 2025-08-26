import { Images, Loader, SendHorizontal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const ChatInput = () => {
  const { sendMessages } = useChatStore();
  let [isSendingMsg, setIsSendingMsg] = useState(false);

  let [text, setText] = useState("");
  let [imagePreview, setImagePreview] = useState(null);
  let fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!text && !imagePreview)
        return toast.error("Type a message before sending");

      setIsSendingMsg(true);
      let message = {
        text: text.trim(),
        image: imagePreview,
      };

      //   console.log(message);

      await sendMessages(message);

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("failed to send message");
      console.log(error);
      //   console.log(error);
      //   toast.error(error.mess);
    } finally {
      setIsSendingMsg(false);
    }
  };

  //   useEffect(() => {
  //     console.log(fileInputRef);
  //     console.log(imagePreview);
  //   }, [imagePreview]);

  return (
    <div className="mt-auto h-auto p-4 flex flex-col items-start">
      {imagePreview && (
        <div className="relative h-20 w-20 rounded-md  mb-2">
          <img
            className="w-full h-full rounded-md object-cover"
            src={imagePreview}
          />
          <X
            onClick={removeImage}
            className="size-4 absolute text-white bg-black rounded-full right-1 top-1"
          />
        </div>
      )}

      <div className="w-full  ">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message ..."
            className="h-full text-gray-200 w-[90%] border border-text px-4 py-1 text-sm  outline-none"
          />
          <input
            id="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            type="file"
            className="hidden"
          />
          <div className="ms-4 flex items-center">
            <label onClick={() => fileInputRef.current?.click()}>
              <Images className="size-5 hover:scale-95 text-text" />
            </label>

            {isSendingMsg ? (
              <Loader className="animate-spin size-5 ms-4  text-text" />
            ) : (
              <button type="submit">
                <SendHorizontal className={`size-5 ms-4  text-text `} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
