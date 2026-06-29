import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedUser = localStorage.getItem("adminUser");
    if (savedToken && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsed);
      } catch {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || "লগইন ব্যর্থ" };

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      return { success: true };
    } catch (e) {
      return { success: false, error: "সার্ভারে সংযোগ ব্যর্থ" };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const next = { ...(prev || {}), ...updates };
      localStorage.setItem("adminUser", JSON.stringify(next));
      return next;
    });
  }, []);

  const hasPermission = useCallback(
    (perm) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return Array.isArray(user.permissions) && user.permissions.includes(perm);
    },
    [user]
  );

  const isSuperAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        hasPermission,
        isSuperAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
