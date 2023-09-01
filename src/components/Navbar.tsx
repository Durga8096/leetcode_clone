import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useSetRecoilState} from 'recoil'
import { authModalState } from '@/atoms/authModalAtom';

type NavbarProps = {};

const Navbar:React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
    return (<div className='flex items-center justify-between'>
    <Link href='/' className='flex items-center justify-center h-20'>
        <Image src='/logo.png' alt='LeetClone' height={200} width={200} />
    </Link>
    <div className='flex items-center'>
        <button
            className='bg-brand-orange rounded-md text-white px-3 py-2 text-sm font-medium
            hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange 
            border-2 border-transparent 
            transition duration-300 ease-in-out' onClick={handleClick}
        >
            Sign In
        </button>
    </div>

</div>
)}
export default Navbar;