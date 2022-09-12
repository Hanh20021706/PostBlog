import React from 'react'
import { LayoutProps } from '../../models/layout'
import HeaderPage from '../Header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type Props = {}

const layoutClient = ({ children }: LayoutProps) => {
  return (
    <div>

      <HeaderPage />

      {children}

      <ToastContainer autoClose={2000} />

    </div>
  )
}

export default layoutClient