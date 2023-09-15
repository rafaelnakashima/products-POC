import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, Auth } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from 'next/navigation';



const Header: React.FC = () => {
  const { cart, total } = useCart();
  const [user, setUser] = useState<Auth['currentUser'] | null>(null); // 
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white p-4 border-gray-300 z-10 h-22 md:mx-20 border mt-2">
      <div className="grid grid-cols-4 items-center text-center font-bold text-sm md:text-lg">
        <div className="col-span-1 text-center">
          {!user ? (
            <Link href={'/login'}>
              <p className="text-indigo-500 hover:text-indigo-600">Login</p>
            </Link>
          ) : (
            <div>
              <p className="text-green-500">{user?.email}</p>
              <button
                onClick={handleLogout}
                className="text-indigo-500 hover:text-indigo-600 ml-2"
              >
                Log off
              </button>
            </div>
          )}
        </div>
        <div className="col-span-1 text-center">
          <Link href="/new-product">
            <p className="text-indigo-500 hover:text-indigo-600">Add New Product</p>
          </Link>
        </div>
        <div className="col-span-1 text-center">
          <Link href="/checkout">
            <p className="text-indigo-500 hover:text-indigo-600">
              Checkout
            </p>
            <p className="text-indigo-500 hover:text-indigo-600">
              ({cart.length} items)
            </p>
          </Link>
        </div>
        <div className="text-center">
          Total cart:{" "}
          <span className="text-indigo-500">
            {total.toLocaleString('us', { style: 'currency', currency: 'USD' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
