"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden scroll-smooth">
      <Image
        fill
        src="/Kallos.jpg"
        alt="Kallos The Ancient Greek Ideal For Beauty"
        className="object-cover opacity-75"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <h1 className="text-4xl font-bold tracking-wide">Kallos</h1>
        <p className="italic text-xl">We provide quality product for workout</p>
      </div>
      <div className="absolute bottom-0 w-full px-10 py-20">
        <div className="flex justify-between">
          <Button asChild className="text-left z-10">
            <Link href="#products-section" className="scroll-smooth">
              Shop now
            </Link>
          </Button>
          <Button
            className="text-right z-10"
            onClick={() => router.push("/about")}
          >
            About us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
