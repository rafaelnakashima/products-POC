import { auth } from "../config";
import { signInWithEmailAndPassword, getAuth, UserCredential, setPersistence, browserLocalPersistence } from "firebase/auth";

export default async function signIn(email: string, password: string): Promise<{ result: UserCredential | null; error: Error | null }> {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    await setPersistence(auth, browserLocalPersistence)
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
