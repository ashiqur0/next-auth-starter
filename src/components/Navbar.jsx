import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    return (
        <div className='px-1 w-7xl mx-auto'>
            <div className='flex items-center justify-between'>
                <div>Next Auth</div>
                <div className='flex items-center gap-3'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/about'}>About</Link>
                    <Link href={'/services'}>Services</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;