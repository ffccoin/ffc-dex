"use client";
import LoadingPage from "@/components/animations/loading";
import Header from "@/components/headers/Header";
import { useEffect, useState } from "react";

const PreloaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
};

export default PreloaderProvider;
