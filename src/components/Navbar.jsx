import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    return (
        <nav className='bg-slate-950'>
            <div className='py-3 w-7xl mx-auto flex items-center justify-between'>
                <div>Next Auth</div>
                <div className='flex items-center gap-3'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/services'}>Services</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;