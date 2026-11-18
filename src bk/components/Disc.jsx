
"use client";

import View from "./View";


const colors = [
  "#172554",
  "#064e3b",
  "#7c2d12",
  "#581c87",
  "#881337",
];

function TestSlide({ color, number }) {
  return (
    <section
      className="flex h-full w-full items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-6xl font-bold text-white">
        SLIDE {number}
      </h1>
    </section>
  );
}

const slides = colors.map((color, index) => (
  <TestSlide
    key={index}
    color={color}
    number={index + 1}
  />
));

export default function DiscTest() {
  return <View slides={slides} />;
}
