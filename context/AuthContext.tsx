import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = { id: string } | null;

type AuthContextType = {
  user: User;
  onboarded: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [onboarded, setOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from storage on app start
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [userData, onboardedData] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("onboarded"),
      ]);

      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (onboardedData) {
        setOnboarded(JSON.parse(onboardedData));
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      const userData = { id: "123" };
      setUser(userData);
      setOnboarded(true);
      await AsyncStorage.multiSet([
        ["user", JSON.stringify(userData)],
        ["onboarded", JSON.stringify(true)],
      ]);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setOnboarded(false);
      await AsyncStorage.multiRemove(["user", "onboarded"]);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const completeOnboarding = async () => {
    try {
      setOnboarded(true);
      await AsyncStorage.setItem("onboarded", JSON.stringify(true));
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onboarded,
        isLoading,
        signIn,
        signOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
