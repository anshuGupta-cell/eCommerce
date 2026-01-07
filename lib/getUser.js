import { auth, currentUser } from "@clerk/nextjs/server";

const getUserId = async () => {
    const { isAuthenticated } = await auth()
    if (!isAuthenticated) {
        return 0
        // return Response.json({
        //     message: "unauthorized"
        // })
    }
    const user = await currentUser()
    console.log("user", user);

    if (!user) {

        return -1;
        // return Response.json({
        //     message: "user not fetched"
        // })
    }

    return user.id
}

export default getUserId;