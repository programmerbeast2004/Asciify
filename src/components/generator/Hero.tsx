import React from 'react';
import TextType from "@/components/TextType";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center mb-4 max-w-2xl relative z-10 pt-4">
      <TextType
        as="h2"
        text={["Elevate your GitHub README.", "Showcase your developer stats.", "Level up your profile."]}
        typingSpeed={60}
        deletingSpeed={30}
        pauseDuration={3000}
        showCursor={true}
        cursorCharacter="|"
        className="text-4xl font-bold text-amber-500 tracking-tight mb-4 leading-tight min-h-[48px]"
        cursorClassName="text-amber-700"
      />
      <p className="text-base text-white/80 leading-relaxed">
        Generate stunning, animated ASCII data cards instantly. No database required. Fully customizable via URL.
      </p>
    </div>
  );
};
