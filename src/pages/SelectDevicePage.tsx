import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    description: "Спутниковый цифровой приемник стандарта DVB-S/S2",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F95b82fa70d144d2883c004e62e43cf14%2F8b3a75dde80c48a8bd40ad05b1f05482?format=webp&width=800",
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    description: "Премиум модель с расширенным функционалом",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F95b82fa70d144d2883c004e62e43cf14%2F8b3a75dde80c48a8bd40ad05b1f05482?format=webp&width=800",
  },
  {
    id: "uclan",
    name: "Uclan",
    description: "Надежный цифровой ресивер для всех ТВ каналов",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F95b82fa70d144d2883c004e62e43cf14%2F8b3a75dde80c48a8bd40ad05b1f05482?format=webp&width=800",
  },
  {
    id: "hdbox",
    name: "HDBox",
    description: "HD тюнер с функцией записи и воспроизведения",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F95b82fa70d144d2883c004e62e43cf14%2F8b3a75dde80c48a8bd40ad05b1f05482?format=webp&width=800",
  },
];

const SelectDevicePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleDeviceSelect = (deviceId: string) => {
    navigate('/error-select');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <header className="w-full max-w-2xl mx-auto flex flex-col items-center pt-10 pb-2">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow mr-2">
            <span className="font-bold text-xl text-blue-600">A</span>
          </div>
          <span className="text-blue-900 text-xl font-bold tracking-wide">АНТ</span>
        </div>
        <div className="text-blue-900 text-lg font-semibold mb-2">Выберите модель вашей ТВ-приставки</div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full mx-auto mt-4 mb-8 px-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white rounded-2xl shadow flex flex-col items-center px-6 py-5 border border-blue-100"
          >
            <img src={device.image} alt={device.name} className="w-32 h-20 object-contain mb-3 mt-1 select-none" />
            <div className="text-lg font-bold text-blue-800 text-center mb-1">{device.name}</div>
            <div className="text-gray-500 text-center text-sm mb-4">{device.description}</div>
            <Button
              onClick={() => handleDeviceSelect(device.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-base shadow-sm transition-all duration-200"
            >
              Выбрать
            </Button>
          </div>
        ))}
      </div>
      <div className="text-center mb-8">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition-all duration-300 rounded-lg px-6 py-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
      </div>
    </div>
  );
};

export default SelectDevicePage;
