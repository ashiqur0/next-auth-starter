'use client'

import Link from "next/link";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";

const AuthButtons = () => {

    const session = useSession();

    return (
        <div>
            <div className="flex gap-5">
                {
                    session.status == 'authenticated' ? <button className="btn">Log out</button> : <>
                        <LoginButton />
                        <Link href={"/register"} className="btn">Register</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default AuthButtons;