"use client";
import Footer from "@/components/Footer";
import LinkedParticlesAnimation from "@/components/animations/LinkedParticlesAnimation";
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
        <div className="flex flex-col justify-between min-h-screen">
          {pathname !== "/login" && <Header />}
          <main className="flex items-center max-w-[100vw] overflow-x-hidden justify-center px-4 relative py-[90px] scrollbar-hidden">
            <LinkedParticlesAnimation />
            {children}
          </main>
          {pathname !== "/login" && <BottomBar />}
          {pathname !== "/login" && <Footer />}
        </div>
      ) : (
        <LoadingPage />
        // <></>
      )}
    </main>
  );
};

export default PreloaderProvider;
