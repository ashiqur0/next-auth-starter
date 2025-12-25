import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    return (
        <nav className='bg-slate-800'>
            <div className='py-3 w-7xl mx-auto flex items-center justify-between'>
                <div>Next Auth</div>
                <div className='flex items-center gap-3'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/public'}>Public</Link>
                    <Link href={'/private'}>Private</Link>
                    <Link href={'/admin'}>Admin</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;