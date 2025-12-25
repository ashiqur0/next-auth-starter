'use client'

import Link from "next/link";
import LoginButton from "./LoginButton";

const AuthButtons = () => {
    return (
        <div>
            <div className="flex gap-5">
                <LoginButton />
                <Link href={"/register"} className="btn">Register</Link>
            </div>
        </div>
    );
};

export default AuthButtons;