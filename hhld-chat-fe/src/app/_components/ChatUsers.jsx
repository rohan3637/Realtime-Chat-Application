import React, { useEffect } from "react";
import useUsersStore from "../zustand/useUsersStore";
import useChatReceiverStore from "../zustand/useChatReceiverStore";
import useChatMsgsStore from "../zustand/useChatMsgsStore";
import useAuthStore from "../zustand/useAuthStore";
import axios from "axios";

function ChatUsers() {
  const { users } = useUsersStore();
  const { chatReceiver, updateChatReceiver } = useChatReceiverStore();
  const { updateChatMsgs } = useChatMsgsStore();
  const { authName } = useAuthStore();

  useEffect(() => {
    const getMsgs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BE_HOST}:5000/msgs`,
          {
            params: {
              sender: authName,
              receiver: chatReceiver,
            },
          },
          {
            withCredentials: true,
          }
        );
        console.log("msgs: " + res.data);
        updateChatMsgs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chatReceiver) getMsgs();
  }, [chatReceiver]);

  return (
    <div>
      {users.map((user, index) => (
        <div
          key={user._id}
          onClick={() => updateChatReceiver(user.username)}
          className="bg-blue-300 rounded-xl m-3 p-5"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}

export default ChatUsers;
