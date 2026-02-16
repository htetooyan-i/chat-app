"use client";

import { createContext, useState } from "react";

type UserSettingLayoutContextType = {
    showPasswordEditingModal: boolean;
    setShowPasswordEditingModal: React.Dispatch<React.SetStateAction<boolean>>;
    showEmailEditingModal: boolean;
    setShowEmailEditingModal: React.Dispatch<React.SetStateAction<boolean>>;
    showUsernameEditingModal: boolean;
    setShowUsernameEditingModal: React.Dispatch<React.SetStateAction<boolean>>;

};

export const UserSettingLayoutContext = createContext<UserSettingLayoutContextType | null>(null);

export function UserSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPasswordEditingModal, setShowPasswordEditingModal] = useState(false);
  const [showEmailEditingModal, setShowEmailEditingModal] = useState(false);
  const [showUsernameEditingModal, setShowUsernameEditingModal] = useState(false);

  return (
    <UserSettingLayoutContext.Provider
      value={{
        showPasswordEditingModal,
        setShowPasswordEditingModal,
        showEmailEditingModal,
        setShowEmailEditingModal,
        showUsernameEditingModal,
        setShowUsernameEditingModal,
      }}
    >
      {children}
    </UserSettingLayoutContext.Provider>
  );
}


