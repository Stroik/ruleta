"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Data } from "@/types/types";

export const Roulette = ({ participants }: { participants: Data[] }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [data, setData] = useState<Data[]>(participants);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSpinClick = () => {
    if (!mustSpin && data.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setSelected(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const removeSelectedOption = () => {
    setSelectedOption(data[selected].option);

    setData((currentData) => {
      const newData = [...currentData];
      newData.splice(selected, 1);
      return newData;
    });

    setMustSpin(false);
    setSelected(0);
  };

  return (
    <section className="grid place-items-center">
      {selectedOption ? (
        <div className="transition-all duration-500">
          Es el turno de {selectedOption}
        </div>
      ) : (
        <p className="transition-all duration-500">
          Gira la ruleta para seleccionar un speaker
        </p>
      )}
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={selected}
        data={data}
        onStopSpinning={removeSelectedOption}
        spinDuration={0.5}
        disableInitialAnimation
        pointerProps={{
          style: {
            cursor: "pointer",
          },
        }}
      />
      <button
        onClick={handleSpinClick}
        className="bg-orange-600 px-6 py-2 text-white rounded-xl"
      >
        Girar
      </button>
    </section>
  );
};
