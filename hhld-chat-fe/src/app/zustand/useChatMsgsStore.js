import { create } from "zustand";

const useChatMsgsStore = create((set) => ({
  chatMsgs: [],
  updateChatMsgs: (chatMsgs) => set({ chatMsgs }),
}));

export default useChatMsgsStore;
