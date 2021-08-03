import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../elements/Button'

export const Footer = () => {
    return(
        <footer className="border-t border-gray-300 p-12 md:px-20 md:pt-20 pb-5 mt-12 bg-primary-dark">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-start border-b border-green-700 pb-20 text-sm">
                    <div className="text-left w-1/2 md:w-auto">
                        <h4 className="hidden md:inline-block font-bold text-primary-light border-b-2 border-green-100 pb-5">Company</h4>
                        <ul className="flex flex-col text-primary-light py-3 md:py-6">
                            <NavLink to="/about">Tentang kami</NavLink>
                            <NavLink to="/blog">Blog</NavLink>
                            <NavLink to="/karir">Karir</NavLink>
                            <NavLink to="/press">Press</NavLink>
                        </ul>
                    </div>
                    <div className="text-left w-1/2 md:w-auto">
                        <h4 className="hidden md:inline-block font-bold text-primary-light border-b-2 border-green-100 pb-5">Informasi</h4>
                        <ul className="flex flex-col text-primary-light py-3 md:py-6">
                            <NavLink to="/about">Newsletter</NavLink>
                            <NavLink to="/about">Resep</NavLink>
                            <NavLink to="/about">Artikel</NavLink>
                            <NavLink to="/about">Kontak</NavLink>
                        </ul>
                    </div>
                    <div className="text-left w-1/2 md:w-auto">
                        <h4 className="hidden md:inline-block font-bold text-primary-light border-b-2 border-green-100 pb-5">Pelayanan</h4>
                        <ul className="flex flex-col text-primary-light py-3 md:py-6">
                            <NavLink to="/about">Rekomendasi</NavLink>
                            <NavLink to="/about">Job</NavLink>
                            <NavLink to="/about">Press</NavLink>
                            <NavLink to="/about">Term of use</NavLink>
                        </ul>
                    </div>
                    <div className="text-left w-1/2 md:w-auto">
                        <h4 className="hidden md:inline-block font-bold text-primary-light border-b-2 border-green-100 pb-5">Gabung sekarang</h4>
                        <ul className="flex flex-col text-primary-light py-3 md:py-6">
                            <input type="text" placeholder="Email Anda" className="border-0 outline-none text-sm text-primary-light border-b border-gray-300 mb-5 bg-transparent placeholder-primary-light" />
                            <Button Rounded type="secondary" className="py-2 px-3 font-bold tracking-wider">Gabung</Button>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-start py-3">
                    <p className="text-sm text-primary-light">	&copy; 2021 dapurIbu. Created by Erik Hernanto. All Right Reserved</p>
                </div>
            </div>
        </footer>
    );
}
