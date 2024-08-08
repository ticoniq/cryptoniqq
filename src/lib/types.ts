// Define the interface for the session context
interface SessionContext {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Export the type
export type { SessionContext };