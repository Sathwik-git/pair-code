"use client";

import { ContainerScroll } from "./ui/container-scroll-animation";
import Demo from "/Demo.png";

function HeroScrollDemo() {
  return (
    <div className="relative h-[40rem] w-full flex items-center justify-center overflow-hidden">
      <ContainerScroll>
        <img
          src={Demo}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-sm object-fit h-full w-auto"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
