import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type NotificationType = "call" | "message" | "appointment" | "missed_call" | "reminder";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  timestamp: number;
  unread?: boolean;
};

export type Profile = {
  name?: string;
  email?: string;
  location?: string;
  avatarDataUrl?: string;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => void;
  setAvatar: (dataUrl: string) => void;
  initials: string;
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, "id" | "timestamp">) => void;
  markAllRead: () => void;
};

const STORAGE_KEY = "alphacare_profile";
const STORAGE_NOTIFS = "alphacare_notifications";

const defaultProfile: Profile = {
  name: "",
  email: "",
  location: "",
  avatarDataUrl: "",
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_NOTIFS);
      if (raw) return JSON.parse(raw);
    } catch (_e) {
      void _e;
    }
    return [
      { id: crypto.randomUUID(), type: "call", title: "New call from Dr. Lee", timestamp: Date.now() - 3600_000, unread: true },
      { id: crypto.randomUUID(), type: "message", title: "Message from City Pharmacy", timestamp: Date.now() - 7200_000, unread: true },
      { id: crypto.randomUUID(), type: "appointment", title: "Missed appointment with Dr. Chen", timestamp: Date.now() - 86400_000 },
      { id: crypto.randomUUID(), type: "missed_call", title: "Missed call from Kids First", timestamp: Date.now() - 5400_000 },
      { id: crypto.randomUUID(), type: "reminder", title: "Upcoming appointment tomorrow 10:00 AM", timestamp: Date.now() + 86400_000 },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const updateProfile = (patch: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...patch }));
  };

  const setAvatar = (dataUrl: string) => {
    setProfile((p) => ({ ...p, avatarDataUrl: dataUrl }));
  };

  const addNotification = (n: Omit<NotificationItem, "id" | "timestamp">) => {
    setNotifications((prev) => [{ id: crypto.randomUUID(), timestamp: Date.now(), ...n }, ...prev]);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((x) => ({ ...x, unread: false })));
  };

  const initials = useMemo(() => {
    const name = profile.name?.trim();
    if (!name) return "U";
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts[1]?.[0] ?? "";
    return (first + last).toUpperCase() || first.toUpperCase() || "U";
  }, [profile.name]);

  return (
    <ProfileContext.Provider
      value={{ profile, updateProfile, setAvatar, initials, notifications, addNotification, markAllRead }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
