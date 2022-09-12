import React from 'react'
import { LayoutProps } from '../../models/layout'
import NavBar from '../NavBar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {}

const adminLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}

      <ToastContainer autoClose={2000}/>
    </div>
  )
}

export default adminLayout