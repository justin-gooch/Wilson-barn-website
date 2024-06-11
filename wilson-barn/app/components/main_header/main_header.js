'use client'
import logo from '@/public/logo.jpeg'
import Link from "next/link";
import NavLink from "./nav-link";
import Image from 'next/image';

export default function MainHeader() {
    return(
        <header id="main-header">
            <div id="logo">
                <Link href="/">
                    <Image src={logo}
                    width={110}
                    height={110}
                    priority
                    sizes='10vw' alt='Friends of the wilson barn' />
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink href='/'>About</NavLink>
                    </li>
                    <li>
                        <NavLink href='/events'>Events</NavLink>
                    </li>
                    <li>
                        <NavLink href='/'>Rentals</NavLink>
                    </li>
                    <li>
                        <NavLink href='/'>Forms</NavLink>
                    </li>
                </ul>

            </nav>
        </header>
    )
}