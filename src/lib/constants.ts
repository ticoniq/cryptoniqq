import { Cog, LayoutPanelLeft, User, HomeIcon } from "lucide-react";

export const APP_TITLE = "Cryptoniq";
export const EMAIL_SENDER = '"Cryptoniq" <no-reply@cryptoniq.tech>';

export enum Paths {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
  Dashboard = "/dashboard",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}


export const privateLinks = [
  { href: "/dashboard", title: "Home", icon: LayoutPanelLeft },
  { href: "/buy-crypto", title: "Buy Crypto", icon: User },
  { href: "/market", title: "Market", icon: Cog },
  { href: "/spot", title: "Spot", icon: Cog },
  { href: "/order-&-trades", title: "Order & Trades", icon: Cog },
  { href: "/wallet", title: "Wallet", icon: Cog },
];
