import { signOut } from "@firebase/auth";
import { auth } from "../firebase";

export const authentication = {
  SignOut: async () => {
    await signOut(auth);
    return null;
  },
};
