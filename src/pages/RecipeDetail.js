import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import useFetch from '../hooks/useFetch';
import Card from '../elements/Card';
import { Modal } from '../elements/Modal';
import { CheckCircleIcon, UserCircleIcon, CalendarIcon, ChevronLeftIcon, StatusOfflineIcon } from '@heroicons/react/outline';
import { PlusCircleIcon, CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/solid';
import { RecipeList } from '../parts/RecipeList';
import { RecipeDetailBanner } from '../parts/Banner';
import { Button } from '../elements/Button';
import { BannerDetailSkeleton, TextSkeleton } from '../elements/Skeleton';

export const RecipeDetail = () => {
    const { key } = useParams();
    const [deviceScreen, setDeviceScreen] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }
        
    }, []);
    
    const { data: recipeDetail, load: loadRecipeDetail, error: errorRecipeDetail } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/recipe/'+key);
    const { data: recipeRelated, load: loadRecipeRelated, error: errorRecipeRelated } = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/search/?q=${encodeURIComponent(key.split("-").join(" "))}`);

    const keyTitle = key.split("-");
    keyTitle.splice(0, 1);

    return (
        <div className="container mx-auto font-body">
            { deviceScreen ? 
                    <div className="flex justify-between items-center w-full bg-gray-50 px-5 py-4 shadow-md mx-auto fixed top-0 z-50">
                        <button onClick={()=>{ history.goBack() }}><ChevronLeftIcon className="h-7 w-7 text-gray-400" /></button>
                        <h1 className="text-md text-center text-gray-500 font-bold tracking-wide">Detail Resep</h1>
                        <div className="w-4 h-4"></div>
                    </div>
                    : ''
                }
            { loadRecipeDetail && 
                <div className="h-auto">
                    <BannerDetailSkeleton type="resep" />
                    <section className="py-8 mx-5 px-3 md:py-2 md:mx-3">
                        <div className="xl:px-16"> 
                        {
                            [1,2,3,4,5,6,7].map(n => (
                                <TextSkeleton key={uuidv4()} />
                            ))
                        }
                        </div>
                    </section>
                </div>
            }
            { errorRecipeDetail &&  <div className="flex justify-center items-center w-full h-full text-lg text-gray-600">{errorRecipeDetail}</div>}
            { recipeDetail &&
                <>
                <section id="banner" className={`relative ${deviceScreen ? 'mt-16' : ''}`}>
                    <RecipeDetailBanner 
                        leftTitle={keyTitle.join(" ")}
                        rightTitle={recipeDetail.title}
                        author={recipeDetail.author}
                        servings={recipeDetail.servings}
                        times={recipeDetail.times}
                        dificulty={recipeDetail.dificulty}
                        needItem={recipeDetail.needItem}
                        thumb={recipeDetail.thumb}
                        isDeviceScreen={deviceScreen}
                    />
                </section>
                <section className="py-2 mx-6 pt-1 md:pb-12 md:pt-10 md:mx-8">
                    <article id="recipe-description" className="px-3 md:px-0 mb-3 md:mb-0 text-justify md:text-left"> 
                        <p className="text-gray-600 py-7 xl:px-16 text-sm lg:text-base whitespace-pre-line" style={{lineHeight: 1.7}}>
                            <span className="block md:inline-block text-xs md:text-sm mb-1 text-gray-400 mr-3">
                                <UserCircleIcon className="hidden md:inline-block h-5 w-7" />Oleh <span className="text-gray-700 font-bold">{recipeDetail.author.user}</span>
                            </span>
                            <span className="block md:inline-block text-xs md:text-sm md:mb-5 text-gray-400 mr-3">
                                <CalendarIcon className="hidden md:inline-block h-5 w-7" /> dipublikasi pada {recipeDetail.author.datePublished}
                            </span>
                            {'\n'}
                            {
                            recipeDetail.desc.split(".").map((word, index)=> {
                                if (index !== 0 && index % 2 === 0) {
                                    return [word, '.', '\n\n'].join('');   
                                }
                                return [word,'. '].join('');  
                            })
                            } 
                        </p>

                        <h2 className="text-gray-800 text-md xl:px-16 md:text-lg font-bold">Bahan-bahan</h2>
                        <p className="text-gray-600 py-7 xl:px-16 leading-loose">
                            {recipeDetail.ingredient.map((item) => (
                                <span className="flex w-full py-1 text-sm lg:text-base" key={uuidv4()}>
                                    <CheckCircleIcon className="h-6 w-6 lg:h-8 lg:w-8 mr-2 text-green-400"/> {item}
                                </span>
                            ))}
                        </p>

                        <h2 className="text-gray-800 text-md md:text-lg xl:px-16 font-bold">Cara Memasak</h2>
                        <div className="xl:px-16">
                            <div className="grid grid-cols-1 gap-y-3 md:gap-y-8 py-7 mt-3">
                                {recipeDetail.step.map((item, index) => { 
                                    const [stepNumber, ...step] = item.split(" ");
                                    return (
                                        <Card isRounded Bordered key={uuidv4()}>
                                            <div className="flex justify-between items-center lg:items-center h-full relative">
                                                <h3 className={`inline-block ${index % 2 === 0 ? 'bg-green-400' : 'bg-red-400'} py-3 px-4 text-white font-bold shadow-md md:shadow-lg rounded-full leading-none absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 lg:-translate-y-1/2`}>{stepNumber}</h3>
                                                <div className={`hidden w-28 h-full md:flex justify-center items-center p-4 border-r-4 ${index % 2 === 0 ? 'text-green-400 border-green-300' : 'text-red-400 border-red-300'}`}>
                                                    {
                                                        index === recipeDetail.step.length-1 ? 
                                                        <CheckCircleSolid className="h-10 w-10" />
                                                        :
                                                        <PlusCircleIcon className="h-10 w-10" />
                                                    }
                                                </div>
                                                <div className="flex-1 mt-12 lg:mt-4 p-5 pt-6 md:px-14">
                                                    <p className="text-sm lg:text-base text-gray-500 text-left"> { step.join(" ") } </p>
                                                </div>
                                            </div>
                                        </Card>
                                    )}
                                )}
                            </div>
                        </div>
                    </article>
                </section>
                
                <section className="py-2 mx-6 mb-5 md:mb-0 md:pb-12 md:pt-10 md:mx-8">
                    <div className="mb-3 md:mb-8">
                        <h1 className="text-md md:text-2xl text-gray-800 font-semibold">Kamu mungkin juga suka</h1>
                    </div>
                    { loadRecipeRelated && <div className="flex justify-center items-center w-full h-36 text-xl text-gray-600">Loading..</div>}
                    { errorRecipeRelated &&  <div className="flex justify-center items-center w-full h-full text-lg text-gray-600">{errorRecipeRelated}</div>}
                    <RecipeList isDeviceScreen={deviceScreen} recipes={recipeRelated} />
                </section>
                </>
            }
            {   errorRecipeDetail &&
                <Modal>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-300 inline-block" />
                        <p className="text-gray-400 tracking-wide capitalize mb-2">{errorRecipeDetail}</p>
                        <Button onClick={()=> window.location.reload()} Rounded Secondary Bordered className="px-8 py-2 my-4">
                            Refresh
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    );
}

