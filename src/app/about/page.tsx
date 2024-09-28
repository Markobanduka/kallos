"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      About Kallos
      <Button onClick={() => router.push("/")}>Back</Button>
    </div>
  );
};

export default Page;
