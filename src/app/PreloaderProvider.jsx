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
    <main className="relative min-h-screen">
      {!loading ? (
        <>
          {pathname !== "/" && <Header />}
          {children}
          {pathname !== "/" && <BottomBar />}
        </>
      ) : (
        <LoadingPage />
      )}
    </main>
  );
};

export default PreloaderProvider;
