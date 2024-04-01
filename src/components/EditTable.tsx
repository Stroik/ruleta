"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { Data } from "@/types/types";
import { ColorPicker } from "./ColorPicker";
import { randomId } from "@/utils/randomId";

export const EditTable = ({ participants }: { participants: Data[] }) => {
  const [filteredParticipants, setFilteredParticipants] =
    useState<Data[]>(participants);
  const [bgColors, setBgColors] = useState<{ [id: string]: string }>({});
  const [textColors, setTextColors] = useState<{ [id: string]: string }>({});
  const navigate = useRouter();

  const postData = async (data: Data[]) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/participants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  };

  const handleBgColorChange = (id: string, color: string) => {
    setBgColors((prevColors) => ({
      ...prevColors,
      [id]: color,
    }));
  };

  const handleTextColorChange = (id: string, color: string) => {
    setTextColors((prevColors) => ({
      ...prevColors,
      [id]: color,
    }));
  };

  const handleSave = async () => {
    const updatedParticipants = filteredParticipants.map((participant) => ({
      ...participant,
      style: {
        backgroundColor:
          bgColors[participant.id] || participant.style.backgroundColor,
        textColor: textColors[participant.id] || participant.style.textColor,
      },
    }));

    setFilteredParticipants(updatedParticipants);

    await postData(updatedParticipants);
    navigate.push("/");
  };

  const handleAddParticipant = () => {
    const newParticipant: Data = {
      id: randomId(),
      option: "",
      style: { backgroundColor: "", textColor: "" },
    };
    setFilteredParticipants([...filteredParticipants, newParticipant]);
  };

  const handleRemoveParticipant = (id: string) => {
    setFilteredParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.id !== id)
    );
  };

  return (
    <>
      <table className="table-auto mb-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color de fondo</th>
            <th>Color de texto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>
                <input
                  type="text"
                  value={participant.option}
                  onChange={(e) =>
                    setFilteredParticipants((current) =>
                      current.map((p) =>
                        p.id === participant.id
                          ? { ...p, option: e.target.value }
                          : p
                      )
                    )
                  }
                  className="border-2 border-gray-300"
                />
              </td>
              <td>
                <ColorPicker
                  initialColor={
                    bgColors[participant.id] ||
                    participant.style.backgroundColor
                  }
                  onColorChange={(color) =>
                    handleBgColorChange(participant.id, color)
                  }
                />
              </td>
              <td>
                <ColorPicker
                  initialColor={
                    textColors[participant.id] || participant.style.textColor
                  }
                  onColorChange={(color) =>
                    handleTextColorChange(participant.id, color)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleRemoveParticipant(participant.id)}>
                  ✖️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="px-4 py-2 bg-blue-500 rounded-xl text-white mr-4"
        onClick={handleAddParticipant}
      >
        Agregar Participante
      </button>
      <button
        className="px-6 py-2 bg-orange-600 rounded-xl"
        onClick={handleSave}
      >
        Guardar
      </button>
    </>
  );
};
