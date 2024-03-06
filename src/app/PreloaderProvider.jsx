"use client";
import LoadingPage from "@/components/animations/loading";
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
    <>
      {!loading ? (
        <>
          {pathname !== "/" && <Header />}
          {children}
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default PreloaderProvider;
