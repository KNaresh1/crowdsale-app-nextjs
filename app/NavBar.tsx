import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../public/logo.png';

const NavBar = () => {
    return (
        <nav className='flex space-x-3 mb-6 h-20 items-center'>
            <Image src={logo} height={40} width={40} alt='Logo'></Image>
            <Link href='/' className='text-lg'>DApp Crowdsale ICO</Link>
        </nav>
    )
}

export default NavBar