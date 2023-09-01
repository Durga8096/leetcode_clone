
import React,{ useState,useEffect} from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import {auth} from "@/firebase/firebase"
import {toast} from 'react-toastify'

type ResetPasswordProps = {
    
};

const ResetPassword:React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Password reset email sent", { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);
    
    return <form className='d-flex flex-column items-center mx-2 p-4' onSubmit={handleReset}>
    <h3 className='text-black mb-5 text-xl font-medium'>Reset Your Password</h3>
    <p className='text-sm text-white mb-5 '>
		Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
		to reset it.
	</p>
    <label htmlFor='email' className='text-black text-md font-medium block mb-2 '>Your email</label>
    <input id='email' type="email" name="email" className='rounded-lg  sm:text-sm block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white mb-5' placeholder='name@company.com' onChange={(e) => setEmail(e.target.value)}/>
    
    <button type='submit' className='w-full text-white mt-5 font-medium rounded-xl text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
Reset Password
</button>
</form>
}
export default ResetPassword;