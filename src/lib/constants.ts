import {
  LayoutPanelLeft,
  Settings,
  LockIcon,
  GiftIcon,
} from "lucide-react";

export const APP_TITLE = "Cryptoniq";
export const EMAIL_SENDER = '"Cryptoniq" <no-reply@cryptoniq.tech>';

export enum Paths {
  Home = "/",
  Support = "/support",
  Login = "/login",
  Signup = "/signup",
  Dashboard = "/dashboard",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}

export const privateLinks = [
  { href: Paths.Dashboard, title: "Dashboard", target: "", icon: LayoutPanelLeft },
  { href: Paths.Support, title: "Help", target: "_blank", icon: LayoutPanelLeft },
];

export const SettingsSidebarLinks = [
  { href: "/account", title: "General", icon: Settings },
  { href: "/account/security", title: "Security", icon: LockIcon },
  { href: "/account/referrals", title: "Referrals", icon: GiftIcon },
];
