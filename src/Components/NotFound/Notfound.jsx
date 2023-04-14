import React from 'react'
import { Helmet } from 'react-helmet'
import notFound from '../../assets/images/page-not-found.png'

export default function Notfound() {
  return <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>NotFound</title>
            </Helmet>
      <div className="container">
        <h2 className='py-2'>Not Found</h2>
        <p >This page doesn't exist.</p>
        <div className="d-flex justify-content-center align-items-center">
        <img src={notFound} alt="" />
        </div>
      </div>
  </>
    
}
