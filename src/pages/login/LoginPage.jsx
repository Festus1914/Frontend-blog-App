import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';


import MainLayout from '../../components/MainLayout';
import { signin } from '../../services/index/loginUser';

const LoginPage = () => {
const { mutate, isLoading } = useMutation({
    mutationFn: ({email, password}) => {
        return signin({email, password});
    },
    onSuccess: (data) => {
        console.log(data);
    },
    onError: (error) => {
        toast.error(error.message)
        console.log(error);
    },
});


const {register, handleSubmit, formState:{ errors, isValid},
    watch,
} = useForm({
    defaultValues: {
        email: "",
        password: "",
    },
    mode: "onChange",

});
  
  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  }

  const password = watch("password");
  
  
  return <MainLayout>
    <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
            <h1 className='font-roboto text-2xl font-bold text-center text-dark-hard mb-8'>
                Sign In
                </h1>
                <form onSubmit={ handleSubmit(submitHandler)}>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="email" className='text-[#5a7184] font-semibold block'>Email</label>
                        <input type="email" id='email' {...register("email", { pattern:{value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email",}, required:{ value: true, message: "Email is required",},})} placeholder='Enter your email' className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? "border-red-500" : "border-[#c3cad9]"}`} />
                        {errors.email?.message && (
                            <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col mb-6 w-full'>
                        <label htmlFor="password" className='text-[#5a7184] font-semibold block'>Password</label>
                        <input type="password" id='password' {...register("password",  {minLength:{value: 6, message:"Password lenght must be at least 6 character",}, required:{ value: true, message: "Password is required",},})} placeholder="Enter your password" className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? "border-red-500" : "border-[#c3cad9]"}`} />
                        {errors.password?.message && (
                            <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                        )}
                    </div>
                </form>
                <Link to="/forget-password" className='text-sm font-semibold text-primary'>Forgot Password?</Link>
                <button type='submit' disabled={!isValid || isLoading} className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed'>Sign In</button>
                <p className='text-sm font-semibold text-[#5a7184] '>Don't have account yet?{" "} <Link to="/signup" className='text-primary '>Sign Up now</Link></p>
        </div>
    </section>
  </MainLayout>
};

export default LoginPage;
