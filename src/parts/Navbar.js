import React, { useState, useEffect} from 'react'
import { Logo } from '../elements/Logo';
import { Link } from 'react-router-dom'
import { SearchInput } from '../elements/SearchInput';
import { Nav } from '../elements/Nav';
import { HomeIcon, NewspaperIcon, BookOpenIcon, MailIcon } from '@heroicons/react/outline';

export const Navbar = () => {

    const [deviceScreen, setDeviceScreen] = useState(false);
    const [activeClass, setActiveClass] = useState('home');

    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }    
        
    }, []);


    return (
        <header className={`fixed ${ deviceScreen ? 'top-full transform -translate-y-full bg-white' : 'top-0 bg-primary-light'} py-4 lg:py-6 w-full z-50`} style={{boxShadow : '0 -2px 3px rgba(0,0,0, 0.03), 0 2px 4px rgba(0,0,0, 0.03)'}}>
            <div className={`container mx-auto ${deviceScreen ? 'px-4' : 'px-8' }`}>
                <nav className="flex justify-between items-center font-ui">
                    { deviceScreen ? '' : <Logo />}
                    <div className={`${ deviceScreen ? 'nav w-full' : 'nav'}`}>
                        <ul className="flex flex-row justify-between items-center text-primary-dark">
                            <Nav activeClass={activeClass === 'home' ? 'font-bold text-red-400' : ''}>
                                <Link onClick={()=> {setActiveClass('home')}} to="/" className="inline-block flex flex-col justify-center items-center">
                                    { deviceScreen ? <HomeIcon className="h-6 w-6 text-gray-400 mb-1" /> : ''}
                                    Home
                                </Link>
                            </Nav>
                            <Nav activeClass={activeClass === 'resep' ? 'font-bold text-red-400' : ''}>
                                <Link onClick={()=> {setActiveClass('resep')}} to="/resep" className="inline-block flex flex-col justify-center items-center">
                                    { deviceScreen ? <BookOpenIcon className="h-6 w-6 text-gray-400 mb-1" /> : ''}
                                    Resep
                                </Link>
                            </Nav>
                            <Nav activeClass={activeClass === 'artikel' ? 'font-bold text-red-400' : ''}>
                                <Link onClick={()=> {setActiveClass('artikel')}} to="/artikel" className="inline-block flex flex-col justify-center items-center">
                                    { deviceScreen ? <NewspaperIcon className="h-6 w-6 text-gray-400 mb-1" /> : ''}
                                    Artikel
                                </Link>
                            </Nav>
                            <Nav activeClass={activeClass === 'kontak' ? 'font-bold text-red-400' : ''}>
                                <Link onClick={()=> {setActiveClass('kontak')}} to="/kontak" className="inline-block flex flex-col justify-center items-center">
                                    { deviceScreen ? <MailIcon className="h-6 w-6 text-gray-400 mb-1" /> : ''}
                                    Kontak
                                </Link>
                            </Nav>
                            { deviceScreen ? '' : <SearchInput isRounded placeholder="Cari" className="h-8" />}
                        </ul>
                    </div>
                </nav>
           </div>
        </header>
    );
}
