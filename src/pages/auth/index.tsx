'use client'
import React,{useState,useEffect} from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import AuthModal from '@/components/Modals/AuthModal';
import {useRecoilValue} from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';
import {useRouter} from 'next/router'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "@/firebase/firebase"


const AuthPage: React.FC = () => {
    const authModal = useRecoilValue(authModalState);
    const [user, loading] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            setPageLoading(false);
            if (user) {
                router.push("/");
            }
        }
    }, [user, router, loading]);

    if (pageLoading) {
        return null;
    }

    return (
        <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
                    <Image src="/hero.png" alt="hero" height={500} width={500} />
                </div>
                {authModal.isOpen && <AuthModal />}
            </div>
        </div>
    );
};

export default AuthPage;
