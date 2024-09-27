import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        fill
        src="/Kallos.jpg"
        alt="Kallos The Ancient Greek Ideal For Beauty"
        className="object-contain "
      />
    </div>
  );
};

export default LandingPage;
