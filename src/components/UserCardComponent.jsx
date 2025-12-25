'use client'

import { useSession } from "next-auth/react";

const UserCardComponent = () => {

    const session = useSession();
    console.log(session);
    return (
        <div>
            <h2 className="font-bold">User Session</h2>
            <div className="border-2 p-4 rounded">{JSON.stringify(session)}</div>
        </div>
    );
};

export default UserCardComponent;