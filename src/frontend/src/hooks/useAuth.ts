import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useGetCallerUserProfile, useGetCallerUserRole } from "../api";
import { UserRole } from "../types";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();

  const queryClient = useQueryClient();

  const roleQuery = useGetCallerUserRole();
  const profileQuery = useGetCallerUserProfile();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const isAdmin = roleQuery.data === UserRole.admin;
  const isPremium = profileQuery.data?.tier === "premium";

  const principal = identity?.getPrincipal();
  const principalText = principal?.toString() ?? null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    identity,
    principal,
    principalText,
    isAdmin,
    isPremium,
    profile: profileQuery.data ?? null,
    profileLoading: profileQuery.isLoading,
    profileFetched: profileQuery.isFetched,
    login: handleLogin,
    logout: handleLogout,
  };
}
