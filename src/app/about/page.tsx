"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Page = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Button className="mb-5" onClick={() => router.push("/")}>
          Back
        </Button>
        <div className="">
          <a
            className="flex items-center gap-2"
            href="https://wa.me/971558865199"
            target="_blank"
          >
            <FaWhatsapp size={30} /> +971 55 886 5199
          </a>
        </div>
      </div>
      <div className="relative overflow-hidden pb-[56.25%] h-0 md:pb-[75%] lg:pb-[50%] mb-14">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10208.16445871588!2d55.410699477726375!3d25.232507084321693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f61060afe46ab%3A0x232ec8245ddcd9b5!2sBelhasa%20Mirdif%20Village!5e0!3m2!1ssr!2srs!4v1727599897899!5m2!1ssr!2srs"
          // allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Responsive Google Map"
          className="absolute left-0 top-0 w-full h-full  md:p-4 lg:p-6"
        ></iframe>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl flex mb-6">About Us</h1>
        <p>
          Welcome to Kallos Gym Essentials, your ultimate destination for
          high-quality fitness products designed to help you achieve your
          workout goals. We believe that the right gear can elevate your fitness
          journey, which is why we carefully curate a selection of premium gym
          equipment, apparel, and accessories to suit all fitness levels. At
          Kallos, we are committed to providing products that combine
          functionality with style, ensuring you look and feel your best during
          every workout. Whether you're a beginner or a seasoned athlete, our
          wide range of products includes everything from durable resistance
          bands, sleek gym wear, to top-tier strength training equipment. Our
          mission is to empower individuals to reach their peak performance with
          gear that enhances their training experience.
        </p>
      </div>
    </div>
  );
};

export default Page;
