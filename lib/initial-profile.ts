import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
    const profile = await currentUser();

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const user = await db.user.findUnique({
        where: {
            id: profile.id
        }
    });

    if (user) {
        return user;
    }

    const newUser = await db.user.create({
        data: {
            id: profile.id,
            nome: `${profile.firstName} ${profile.lastName}`,
            username: String(profile.username),
        }
    });

    return newUser;
}