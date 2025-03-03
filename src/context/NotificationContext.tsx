"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useContext } from "react";

interface NotificationContextType {
  notifications: Notification[];
}

interface Notification {
  id: string;
  inviter: string;
  invitee: string;
  inviter_link: string;
  invitee_link: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  useEffect(() => {
    async function getNotifications() {
      try {
        const username = localStorage.getItem("username");
        const response = await axios.get(
          `http://127.0.0.1:8000/view-invites/${username}`
        );
        const invites = response.data.invites;
        console.log(invites);
        setNotifications(invites);
      } catch (error) {
        console.log(error);
      }
    }

    getNotifications();

    const interval = setInterval(() => {
      getNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};
