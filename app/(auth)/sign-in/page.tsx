"use client";

import AuthForm from '@/app/components/forms/AuthForm'
import { SignInSchema } from '@/lib/validations'
import React from 'react'

const SignIn = () => {
  return (
    <AuthForm
    formType="SIGN_IN"
    schema={SignInSchema}
    defaultValues={{email:"", password:""}}
    onSubmit={(data) => Promise.resolve({success:true,data})}/>
  )
}

export default SignIn