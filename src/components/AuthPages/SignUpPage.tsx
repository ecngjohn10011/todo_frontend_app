import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

interface IFormInput {
  username: string;
  email: string,
  firstName: String,
  lastName: String,
  password: string;
}

export const SignUpPage = () => {

  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  const navigate = useNavigate()

  return (
    <div className='md:p-6 p-2 w-full h-full flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center bg-gray-100 text-slate-800 rounded-md p-8 h-full md:pt-10 md:px-24 m-0 md:mx-8 w-full sm:w-4/5 md:w-3/5 lg:w-2/5'>

        <div className='mb-8'>
          <h2 className='font-semibold text-4xl' style={{color: '#060024'}}>
            Sign Up
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>

          <div className='my-2.5 w-full'>
            <Controller
              render={({ field }) => <TextField {...field} className='w-full' label="Username" variant="standard"/>}
              name="username"
              control={control}
              defaultValue=""
            />
          </div>


          <div className='my-2.5 w-full'>
            <Controller
              render={({ field }) => <TextField {...field} className='w-full' label="First name" variant="standard"/>}
              name="firstName"
              control={control}
              defaultValue=""
            />
          </div>

          <div className='my-2.5 w-full'>
            <Controller
              render={({ field }) => <TextField {...field} className='w-full' label="Last name" variant="standard"/>}
              name="lastName"
              control={control}
              defaultValue=""
            />
          </div>

          <div className='my-2.5 w-full'>
            <Controller
              render={({ field }) => <TextField {...field} className='w-full' label="Email" type='email' variant="standard"/>}
              name="email"
              control={control}
              defaultValue=""
            />
          </div>

          
          <div className='mb-2.5 w-full'>
            <Controller
              render={({ field }) => <TextField {...field} className='w-full' label="Password" variant="standard"  type="password" />}
              name="password"
              control={control}
              defaultValue=""
            />
          </div>
          
          <div className='mb-6 mt-6 w-full flex justify-end'>
            <Button variant="contained" className='w-full md:w-fit' type='submit'>Sign Up</Button>
          </div>
        </form>
    
        <div className='mb-6 w-full flex justify-end hover:cursor-pointer'>
          <a href='#' onClick={() => navigate("/login")}>
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>

  );
}