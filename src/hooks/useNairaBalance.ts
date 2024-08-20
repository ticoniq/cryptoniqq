import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { NairaAccount } from "@prisma/client";

const fetchNairaBalance = async (): Promise<NairaAccount> => {
  const res = await fetch("/api/user/wallet/account/balance");
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }
  return res.json();
};

export const useNairaBalance = (): UseQueryResult<NairaAccount, Error> => {
  return useQuery<NairaAccount, Error>({
    queryKey: ["user-balance"],
    queryFn: fetchNairaBalance,
  });
};