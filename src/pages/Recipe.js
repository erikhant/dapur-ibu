import React, { useState, useEffect } from 'react'
import { RecipeBanner } from '../parts/Banner';
import { SearchInput } from '../elements/SearchInput';
import { RecipeList } from '../parts/RecipeList';
import { Button } from '../elements/Button';
import useFetch from '../hooks/useFetch';
import Grid from '../elements/Grid';
import GrilledChicken from "../assets/resep/icon/chicken-leg.svg";
import BeefMeat from "../assets/resep/icon/meatloaf.svg";
import Seafood from "../assets/resep/icon/shrimp.svg";
import Breakfast from "../assets/resep/icon/cereals.svg";
import SoupBowl from "../assets/resep/icon/soup.svg";
import Traditional from "../assets/resep/icon/nasi-goreng.svg";
import Salad from "../assets/resep/icon/salad.svg";
import Dessert from "../assets/resep/icon/panna-cotta.svg";
import { SearchIcon, StatusOfflineIcon, RefreshIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { Modal } from '../elements/Modal';
import { BannerSkeleton, CardSkeleton } from '../elements/Skeleton';

export const Recipe = () => {


    const [deviceScreen, setDeviceScreen] = useState(false);
    const [page, setPage] = useState(1);
    const [allRecipe, setAllRecipe] = useState([]);
    const { data: recipes, load: loadRecipes, error: errorRecipes } = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/recipes-length/?limit=6`);
    const { data: recipePerPage, load: loadRecipePerPage, error: errorRecipePerPage } = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/recipes/${page}`);


    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }
    }, []);

    useEffect(() => {
        setAllRecipe(prevRecipe => {
            if (!recipePerPage) return prevRecipe;

            return prevRecipe.concat(recipePerPage);
        });

    }, [recipePerPage]);

    const handlePrevPage = (counter) => {
        setPage(prevPage => Math.max(prevPage - counter, 1))
    }

    const handleNextPage = (counter) => {
        setPage(page < 20 ? page + counter : page);
    }

    return (
        <div className="container mx-auto font-body">
            {deviceScreen ?
                <div className="flex items-center w-full bg-gray-50 px-5 py-3 shadow-md mx-auto fixed top-0 z-50">
                    <SearchIcon className="h-7 w-7 text-gray-400" />
                    <SearchInput isRounded isWide placeholder="Cari Masakan Favoritmu.." className="h-8" />
                </div>
                : ''
            }
            {/* Part Banner */}
            {loadRecipes && <BannerSkeleton /> }
            {errorRecipes && <div className="flex justify-center items-center w-full h-52 text-xl text-gray-600">{errorRecipes}</div>}
            {recipes &&
                <section id="banner" className="relative h-screen">
                    <RecipeBanner isDeviceScreen={deviceScreen} data={recipes} />
                        { deviceScreen ? ''
                            :
                            <div className="w-1/2 bg-gray-50 rounded-full shadow-xl absolute bottom-12 right-0 transform -translate-x-24 h-12 z-20">
                                <SearchInput hasIcon isRounded isWide placeholder="Cari resep.." className="h-full" />
                            </div>
                        }
                </section>

            }
            {/* Part Resep Terbaru */}
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-12 font-body">
                <div className="mb-3 md:mb-8 text-center">
                    <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Pilihan Kategori</h1>
                </div>

                <Grid cols={4} rows={2} className="rounded-lg">
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-r border-b md:border-none">
                        <Link to="/resep/kategori/resep-ayam" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={GrilledChicken} className="w-36 h-36 mb-1 md:mb-5" alt="resep-ayam" />
                            Resep ayam
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-b md:border-none">
                        <Link to="/resep/kategori/resep-daging" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={BeefMeat} className="w-36 h-36 mb-1 md:mb-5" alt="resep-daging" />
                            Resep daging
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-r border-b md:border-none">
                        <Link to="/resep/kategori/resep-seafood" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={Seafood} className="w-36 h-36 mb-1 md:mb-5" alt="seafood" />
                            Resep seafood
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-b md:border-none">
                        <Link to="/resep/kategori/sarapan" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={Breakfast} className="w-36 h-36 mb-1 md:mb-5" alt="sarapan" />
                            Sarapan
                        </Link>
                    </div>

                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-r border-b md:border-none">
                        <Link to="/resep/kategori/masakan-hari-raya" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={SoupBowl} className="w-36 h-36 mb-1 md:mb-5" alt="masakan-hari-raya" /> 
                            Masakan Hari Raya
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-b md:border-none">
                        <Link to="/resep/kategori/masakan-tradisional" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={Traditional} className="w-36 h-36 mb-1 md:mb-5" alt="masakan-tradisional" />
                            Masakan tradisional
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 border-r md:border-none">
                        <Link to="/resep/kategori/resep-sayuran" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={Salad} className="w-36 h-36 mb-1 md:mb-5" alt="resep-sayuran" />
                            Resep sayuran
                        </Link>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-10 text-center hover:bg-gray-100 md:border-none">
                        <Link to="/resep/kategori/resep-dessert" onClick={()=> window.scrollTo(0, 0)} className="inline-block text-center text-md text-gray-500 font-ui transition duration-200 hover:text-primary-dark hover:font-bold">
                            <img src={Dessert} className="w-36 h-36 mb-1 md:mb-5" alt="desserts" />
                            Desserts
                        </Link>
                    </div>
                </Grid>
            </section>
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-12 font-body">
                <div className="mb-3 md:mb-8 flex justify-between items-center w-full">
                    <h1 className="text-md md:text-xl text-gray-700 font-semibold">Semua Resep</h1>
                    {/* Load Content using pagination */}
                    {/* <div className="hidden md:flex justify-center items-center">
                            <button className="prev px-3 py-1 mr-1 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md rounded-xl font-bold text-sm flex justify-between items-center border border-gray-400"
                                    onClick={() => handlePrevPage(1)}
                                    disabled={page <= 1 ? true : false}>
                                <ArrowNarrowLeftIcon className="h-5 w-5 mr-1" />
                                prev
                            </button>
                            { page-2 >= 1 ?
                                <button className="inline-block px-3 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-400 rounded-md"
                                    onClick={() => handlePrevPage(2)}>
                                    {page-2}
                                </button> : ''
                            }
                            { page-1 >= 1 ?
                                <button className="inline-block px-3 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-400 rounded-md"
                                    onClick={() => handlePrevPage(1)}>
                                    {page-1}
                                </button> : ''
                            }
                            <button className="inline-block px-3 focus:outline-none focus:ring-1 focus:ring-green-500 rounded-md text-gray-700 font-bold bg-gray-200">
                                {page}
                            </button>
                            { page + 1 <= 20 ?
                                <button className="inline-block px-3 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-400 rounded-md"
                                    onClick={() => handleNextPage(1)}>
                                    { page+1 }
                                </button> : ''
                            }
                            { page + 2 <= 20 ?
                                <button className="inline-block px-3 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-400 rounded-md"
                                    onClick={() => handleNextPage(2)}>
                                    { page+2 }
                                </button> : ''
                            } 
                            <button className="next px-3 py-1 ml-1 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md rounded-xl font-bold text-sm flex justify-between items-center border border-gray-400"    
                                    onClick={() => handleNextPage(1)}
                                    disabled={page < 20 ? false : true}>
                                next
                                <ArrowNarrowRightIcon className="h-5 w-5 ml-1" />
                            </button>
                        </div> */}

                </div>
                {/* Load content using lazy load */}
                {loadRecipes && <CardSkeleton /> }
                {errorRecipePerPage && <div className="flex justify-center items-center w-full h-52 text-lg text-gray-600">{errorRecipePerPage}</div>}
                {allRecipe.length >= 1 ?
                    (<>
                        <RecipeList recipes={allRecipe} />
                        <div className="flex mt-8 justify-center items-center">
                            <button onClick={() => { handleNextPage(1) }} disabled={loadRecipePerPage ? true : false} className={`${page >= 20 ? setTimeout(() => { return 'hidden' }, 2000) : ''} px-5 py-2 text-gray-400 text-sm border border-gray-300 bg-gray-50 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-opacity-75 hover:bg-gray-200 tracking-wider`}>
                                {loadRecipePerPage ?
                                    (<span>Loading <RefreshIcon className="h-5 w-5 animate-spin inline-block" /></span>)
                                    : 'Load More'
                                }
                            </button>
                            {page >= 20 ? setTimeout(() => <span className="text-gray-300 text-md">Semua resep sudah ditampilkan</span>, 2000) : ''}
                        </div>
                    </>
                    )
                    :
                    ''
                }
                {errorRecipes &&
                    <Modal>
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-300 inline-block" />
                            <p className="text-gray-400 tracking-wide capitalize mb-2">{errorRecipes}</p>
                            <Button onClick={() => window.location.reload()} Rounded Secondary Bordered className="px-8 py-2 my-4">
                                Refresh
                            </Button>
                        </div>
                    </Modal>
                }

            </section>

        </div>
    );
}
