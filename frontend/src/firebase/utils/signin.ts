import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string): Promise<{ result: UserCredential | null; error: Error | null }> {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
