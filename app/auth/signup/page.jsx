'use client'
import Link from "next/link";
import signUpNewUser from "./signUpInput";
import { useFormStatus } from "react-dom";
import { useState, useActionState } from "react";

const initialState = {
	error: undefined
};

function SubmitButton({ disabled=true }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending || disabled}
			className={` bg-red-600 hover:bg-red-500 w-36 ${ pending && "opacity-50" }`}
		>
			{pending ? "Signing Up..." : "Sign Up"}
		</button>
	);
}

export default function signUpPage() {
	const [state, formAction] = useActionState(signUpNewUser, initialState);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const passwordsDoNotMatch =
		confirmPassword.length > 7 && password !== confirmPassword;

	return (
		<main>
			<img src="/icons/manSettingFlag.svg" className="icon-ph"/>
			<h1>Sign up</h1>
			<p className="text-center">Register your name and e-mail to access your role on the upcoming Surprise Trip. Use your known surprise communication e-mail.</p>
			
			<p className="bg-yellow-100/70 text-amber-800 p-2 rounded-full px-4 py-2 m-1 text-xs">
				<span className="text-sm">⚠️ </span> 
				Profile changes not possible after registration.
			</p>
			<div className="mt-4 justify-center flex gap-4">
				<form action={formAction} className="flex flex-col">
					<input name="fname" type="text" placeholder="First Name" required/>
					<input name="lname" type="text" placeholder="Last Name" required/>
					<input name="email" type="email" placeholder="E-mail" required/>
					<input name="password" type="password" placeholder="Password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}/>
					<input name="cnfPassword" type="password" placeholder="Confirm Password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
						{passwordsDoNotMatch && (
							<div className="bg-red-300 text-red-700 p-2 rounded-full px-4 py-2 m-1 text-sm">
								❌ Passwords do not match
							</div>
						)}
					<input name="nname" type="text" placeholder="Nickname (optional)" maxLength={20}/>
						{state.error && (
							<div className="bg-red-300 text-red-700 p-2 rounded-full px-4 py-2 m-1 text-sm">
								❌ {state.error}
							</div>
						)}

					<div className="flex justify-between mt-6">
						<Link href="/auth/welcome">
							<button type="button" className="w-24 bg-gray-500/50 hover:bg-gray-200/50">Back</button>
						</Link>
						<SubmitButton disabled={passwordsDoNotMatch}/>
					</div>
				</form>      
			</div>
		</main>
	);
}
