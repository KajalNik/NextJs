import React, { ReactNode } from 'react'
import SocialAuthForm from '../components/forms/SocialAuthForm'

const AuthLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark'>
      <section className='light-border background-light800_dark200'>
      <div className="flex justify-between items-center gap-2">
          <div className="space-y-2.5">
            <h1 className="text-dark100_light900 h2-bold">Join DevFlow</h1>
            <p className="text-dark500_light400 paragraph-regular">
              To get your questions answered
            </p>
          </div>
         
        </div>
      {children}
      <SocialAuthForm/>
      </section>
    </main>
  )
}

export default AuthLayout