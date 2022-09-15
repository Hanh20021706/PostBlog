import axios from 'axios'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '../styles/Home.module.css'
import { toast } from 'react-toastify';



type Props = {}

const HeaderPage = (props: Props) => {

    const route = useRouter()

    const [user, setUser] = useState<any>(null)


    useEffect(() => {
        const userDetail = async () => {
            const { data } = await axios.get("/api/user/signin");
            setUser(data)
        }
        userDetail();
    }, [route.pathname])
    const logout = () => {
        const confirm = window.confirm("Bạn có chắc muốn đăng xuất không ?")
        if (confirm) {
            deleteCookie('cookieUser');
            setUser(undefined)
            route.push('/signin')
            toast.success("Đăng xuất thành công ")
        }
    }

  

    return (
        <div className={style.header__page}>
            <div className={style.box__header}>
                <div className={style.box__menu__header}>
                    <div className={style.logo__header}>

                        <h2 className='font-bold font-sans text-xl'>
                            <Link href={'/'}>
                                MyBlog
                            </Link>
                        </h2>

                    </div>

                    <nav className={style.box__nav}>
                        <Link href={'/'}> Home</Link>
                        <Link href={'/posts'}> Post</Link>
                        {user?.dataUser?.role == 'ADMIN' ? <Link href="/admin/posts">Admin</Link> : ""}
                    </nav>
                    <div className={style.nav__login}>


                        <a > {user?.message !== "het han cookie" ? ` ${user?.dataUser?.name}` : ""}</a>
                        {!user?.dataUser ? <Link href="/signin"><a style={{ marginRight: '10px' }}>Đăng nhập</a></Link> : ""}
                        {!user?.dataUser ? <Link href="/signup">Đăng kí</Link> : ""}
                        {user?.message !== "het han cookie" ? <button style={{ marginLeft: '20px' }} onClick={() => logout()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button> : ""}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default HeaderPage