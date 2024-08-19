"use client";
import { useQuery } from '@tanstack/react-query';
import { getUserTransactions } from './actions';
import { Transaction } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type GroupedTransactions = Record<string, Transaction[]>;

export function TransactionHistory() {
  const { data, status, error } = useQuery<GroupedTransactions, Error>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const result = await getUserTransactions();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data as GroupedTransactions;
    },
  });

  if (status === "pending") {
    return (
      <>
        <div className="max-w-[40rem] mx-auto my-20">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="my-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="max-w-[40rem] mx-auto my-20">
        <p className="text-center text-red-600">{error.message}</p>
      </div>
    );
  }

  if (data && Object.keys(data).length === 0) {
    return (
      <div className="max-w-[40rem] mx-auto my-20">
        <p className="text-center">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="max-w-[40rem] mx-auto my-20">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(data).map(([month, monthTransactions]) => (
          <>
            <AccordionItem key={month} value={month}>
              <AccordionTrigger className="text-xl">{month}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {monthTransactions.map((transaction) => (
                    <li key={transaction.id} className="border p-2 rounded">
                      <span className={transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'CREDIT' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </span>
                      <span className="ml-4 text-gray-600">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </span>
                      <span className="ml-4 text-sm text-gray-500">
                        Ref: {transaction.reference}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </div>
  );
}