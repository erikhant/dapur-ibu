import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {v4 as uuidv4} from 'uuid';
import Card from '../elements/Card';
import { ClockIcon, CheckCircleIcon, ChartPieIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import 'swiper/swiper-bundle.css';

export const RecipeList = ({recipes, isDeviceScreen}) => {

    return (
        <div className="recipes">
           { isDeviceScreen ? 
                (<Swiper 
                    spaceBetween={10} 
                    slidesPerView={2}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 14
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 13
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 13
                        }
                    }}
                    >
                {
                recipes && recipes.map((recipe) => (
                    <SwiperSlide key={uuidv4()}>
                        <div className="h-auto">
                                <Card isRounded Bordered hasShadow overFlow>
                                    <Link to={`/resep/${recipe.key}`} onClick={()=> window.scrollTo(0, 0)}>
                                        <div className="h-24 md:h-52 lg:h-40 relative">
                                            <div className="absolute left-0 top-0 flex">
                                                <span className="flex text-gray-50 text-xs bg-primary md:font-bold p-1 rounded-br-md rounded-tl-md">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {recipe.times}&nbsp;
                                                </span>                                            
                                            </div>
                                            <img src={recipe.thumb} className="w-full h-full object-cover object-center" alt={recipe.key} />
                                        </div>
                                        <div className="px-4 pt-3 pb-1 md:pb-4 md:pt-6 md:border-b border-gray-300">
                                            <h3 className="text-gray-500 text-sm md:text-base font-semibold font-ui leading-snug md:leading-lg">
                                                {recipe.title.split(" ").length >= 7 ? recipe.title.split(" ", 8).slice(1).join(" ")+'..' : recipe.title}
                                            </h3>
                                            <div className="flex mt-3 p-1 md:p-0 bg-green-50 md:bg-transparent rounded-sm">
                                                <span className="flex text-gray-400 text-xs">
                                                    <ChartPieIcon className="hidden md:inline-block h-4 w-4" />{recipe.portion || recipe.serving}&nbsp;
                                                </span>    
                                                <span className="flex text-gray-400 text-xs">
                                                    <CheckCircleIcon className="h-4 w-4" />{recipe.dificulty || recipe.difficulty}
                                                </span>    
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-3 flex justify-center items-center">
                                        <button className="bg-transparent focus:outline-none border-none p-1">
                                            <HeartIcon className="w-6 h-6 md:w-5 md:h-5 mx-2 md:mx-1 text-gray-400" />
                                        </button>
                                        <button className="bg-transparent focus:outline-none border-none p-1">
                                            <ShareIcon className="w-6 h-6 md:w-5 md:h-5 mx-2 md:mx-1 text-gray-400" />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                    </SwiperSlide>
                ))
                }
            </Swiper>)

            :
                
            (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-5 lg:gap-x-4 lg:gap-y-6 xl:gap-x-3">
                {
                recipes && recipes.map((recipe) => (
                            <div className="h-auto" key={uuidv4()}>
                                <Card isRounded Bordered hasShadow overFlow>
                                    <Link to={`/resep/${recipe.key}`} onClick={()=> window.scrollTo(0, 0)}>
                                        <div className="h-24 md:h-52 lg:h-40 relative">
                                            <div className="absolute left-0 top-0 flex">
                                                <span className="flex text-gray-50 text-xs bg-primary md:font-bold p-1 rounded-br-md rounded-tl-md">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {recipe.times}&nbsp;
                                                </span>                                            
                                            </div>
                                            <img src={recipe.thumb} className="w-full h-full object-cover object-center" alt={recipe.key} />
                                        </div>
                                        <div className="px-4 pt-3 pb-1 md:pb-4 md:pt-6 md:border-b border-gray-300">
                                            <h3 className="text-gray-500 text-sm md:text-base font-semibold font-ui leading-snug md:leading-lg">
                                                {recipe.title.split(" ").length >= 7 ? recipe.title.split(" ", 8).slice(1).join(" ")+'..' : recipe.title}
                                            </h3>
                                            <div className="flex mt-3 p-1 md:p-0 bg-green-50 md:bg-transparent rounded-sm">
                                                <span className="flex text-gray-400 text-xs">
                                                    <ChartPieIcon className="hidden md:inline-block h-4 w-4" />{recipe.portion || recipe.serving}&nbsp;
                                                </span>    
                                                <span className="flex text-gray-400 text-xs">
                                                    <CheckCircleIcon className="h-4 w-4" />{recipe.dificulty || recipe.difficulty}
                                                </span>    
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-2 md:p-3 flex justify-center items-center">
                                        <button className="bg-transparent focus:outline-none border-none p-1">
                                            <HeartIcon className="w-6 h-6 md:w-5 md:h-5 mx-2 md:mx-1 text-gray-400" />
                                        </button>
                                        <button className="bg-transparent focus:outline-none border-none p-1">
                                            <ShareIcon className="w-6 h-6 md:w-5 md:h-5 mx-2 md:mx-1 text-gray-400" />
                                        </button>
                                    </div>
                                </Card>
                            </div>
                    ))
                }
            </div>)
            }
        </div> 
                
    );
}

RecipeList.propTypes = {
    recipes: propTypes.array,
    isDeviceScreen: propTypes.bool,
}