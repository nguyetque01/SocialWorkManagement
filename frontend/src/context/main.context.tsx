import React, { createContext, useState, useEffect } from "react";

interface IMainContextInterface {
  location: string;
  device: string;
  city: string;
  country: string;
}

export const MainContext = createContext<IMainContextInterface>({
  location: "",
  device: "",
  city: "",
  country: "",
});

interface IMainContextProviderProps {
  children: React.ReactNode;
}

const MainContextProvider = ({ children }: IMainContextProviderProps) => {
  const [location, setLocation] = useState<string>("");
  const [device, setDevice] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=vi`
        );
        const data = await response.json();

        const city = data.city;
        const country = data.countryName;

        setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setCity(city || "Unknown");
        setCountry(country || "Unknown");
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);
        setLocation("Không thể lấy vị trí.");
      }
    );

    const userAgent = navigator.userAgent;
    setDevice(userAgent);
  }, []);

  return (
    <MainContext.Provider value={{ location, device, city, country }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
