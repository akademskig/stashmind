import { auth } from "@clerk/nextjs/server";

export const getAuth = () => auth();
