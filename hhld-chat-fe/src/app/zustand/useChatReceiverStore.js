import { create } from "zustand";

const useChatReceiverStore = create((set) => ({
  chatReceiver: "",
  updateChatReceiver: (chatReceiver) => set({ chatReceiver: chatReceiver }),
}));

export default useChatReceiverStore;
