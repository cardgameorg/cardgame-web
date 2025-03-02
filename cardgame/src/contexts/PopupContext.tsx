import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for the popup
interface Popup {
  id: number;
  message: string;
}

// Define types for the context
interface PopupContextType {
  popups: Popup[];
  addPopup: (message: string) => void;
  removePopup: (id: number) => void;
}

// Create the context with default values
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Popup Provider component
export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popups, setPopups] = useState<Popup[]>([]);

  const addPopup = (message: string) => {
    setPopups((prevPopups) => [
      ...prevPopups,
      { message, id: Date.now() }
    ]);
  };

  const removePopup = (id: number) => {
    setPopups((prevPopups) => prevPopups.filter((popup) => popup.id !== id));
  };

  return (
    <PopupContext.Provider value={{ popups, addPopup, removePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the PopupContext
export const usePopups = (): PopupContextType => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopups must be used within a PopupProvider');
  }
  return context;
};
