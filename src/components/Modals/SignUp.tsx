import React, { useEffect } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import {toast} from 'react-toastify'
type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: 'login' }));
    };

    const [inputs, setInputs] = useState({ email: '', displayName: '', password: '' });
    const router = useRouter();

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!inputs.email || !inputs.displayName || !inputs.password) {
            return alert('Please fill all fields');
        }

        try {
            toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.displayName,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};

            await setDoc(doc(firestore, "users", newUser.user.uid), userData);
            router.push('/');
        } catch (error: any) {
            toast.error(error.meassage,{position:"top-center"})
        }finally{
            toast.dismiss("loadingToast")
        }
    };

    useEffect(() => {
        if (error) alert(error.message);
    }, [error]);

    return (
        <form className="d-flex flex-column items-center mx-2 p-4" onSubmit={handleRegister}>
            <h3 className="text-white mb-5 text-xl font-medium">Register to Leetcode</h3>
            <label htmlFor="email" className="text-black text-md font-medium block mb-2">
                Email
            </label>
            <input
                onChange={handleChangeInput}
                id="email"
                type="email"
                name="email"
                className="rounded-lg sm:text-sm block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white mb-5"
                placeholder="name@company.com"
            />
            <label htmlFor="displayName" className="text-black text-md font-medium block mb-2">
                Display name
            </label>
            <input
                onChange={handleChangeInput}
                id="displayName"
                type="text"
                name="displayName"
                className="rounded-lg sm:text-sm block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white mb-5"
                placeholder="Durga Bhavani"
            />
            <label htmlFor="password" className="text-black text-md font-medium block mb-2 mt-4">
                Your password
            </label>
            <input
                onChange={handleChangeInput}
                id="password"
                type="password"
                name="password"
                className="rounded-lg text-md font-medium block w-full p-2.5 bg-gray-600 border-gray-500 mb-5 placeholder-gray-400 text-white"
                placeholder="........"
            />

            <button
                type="submit"
                className="w-full text-white mt-5 font-medium rounded-xl text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s mb-3"
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
            <div className="text-sm font-medium text-gray-400 mt-5">
                Already have an account?{' '}
                <a
                    href="#"
                    className="text-blue-700 hover:underline text center"
                    onClick={handleClick}
                >
                    Login
                </a>
            </div>
        </form>
    );
};

export default SignUp;
