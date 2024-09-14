import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect('/');
    }

    const profile = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!profile) {
        return redirect('/');
    }

    return profile;
}