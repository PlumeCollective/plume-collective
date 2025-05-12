import { useLocalStorage } from "@vueuse/core";
import type { Database } from "@/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];

const currentUser = useLocalStorage<User | null>("user", null);

export { currentUser, type User };
