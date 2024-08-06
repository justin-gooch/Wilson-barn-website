'use server'
import { redirect } from "next/navigation";
import { createUser, getUserHashedPasswordAndID } from "@/app/lib/database/users";
import { hashUserPassword, verifyPassword } from "@/app/lib/hash";
import { createAuthSession } from "@/app/lib/auth";

 

export async function submitLogin(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let errors = {};

    const userHashedPasswordAndID = await getUserHashedPasswordAndID(email);
    if (userHashedPasswordAndID) {
        console.log('submitLogin userhashedpass', userHashedPasswordAndID['password']);
        const verified = verifyPassword(userHashedPasswordAndID['password'], password)
        if(verified) {
            const userID = userHashedPasswordAndID['id']
            await createAuthSession(userID)
            redirect('/')
        }
        else {
            errors.password = 'this is the incorrect password'
        }
    }

    if(!userHashedPassword) {
        errors.email = 'This email does not exist'
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        }
    }
}

export async function submitRegistration(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password');
    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');

    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address.';
    }

    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (first_name.trim().length < 2) {
        errors.first_name = 'First Name must be at least 2 characters long'
    }
    if (last_name.trim().length < 2) {
        errors.last_name = 'last Name must be at least 2 characters long'
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        }
    }

    try {
        const userId = await createUser(email, hashUserPassword(password), first_name, last_name);
        console.log('user id for registration is', userId)
        await createAuthSession(userId)
        redirect('/registrationSuccess')


    } catch(error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'It seems like an account for the chosen email already exists'
                }
            }
        }
        throw error
    }
   
}