"use client";
import LoadingPage from "@/components/animations/loading";
import BottomBar from "@/components/headers/BottomBar";
import Header from "@/components/headers/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PreloaderProvider = ({ children }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <main className="min-h-screen h-full">
      {!loading ? (
        <div className="flex flex-col h-screen justify-between">
          {pathname !== "/login" && <Header />}
          {children}
          {pathname !== "/login" && <BottomBar />}
        </div>
      ) : (
        // <LoadingPage />
        <></>
      )}
    </main>
  );
};

export default PreloaderProvider;
