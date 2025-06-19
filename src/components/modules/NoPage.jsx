import React from 'react'
import { Layout } from '../layout/Layout'

export const NoPage = () => {
  return (
    <Layout>
      <div className='flex justify-center items-center min-h-screen'>
        <h2 className='text-center text-4xl font-bold text-[var(--text-primary)]'>Page Not Found!</h2>
    </div>
    </Layout>
  )
}
