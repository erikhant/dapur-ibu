import React from 'react';
import Card from './Card';

import { Swiper, SwiperSlide } from 'swiper/react';
import {v4 as uuidv4} from 'uuid';
import 'swiper/swiper-bundle.css';
import Grid from './Grid';



export const CardSkeleton = ({isMobileScreen, horizontal}) => {
    return (
        <div className="load-item animate-pulse">
            {
                isMobileScreen ?
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
                        }
                    }}
                    >
                {
                    [1,2,3,4,5].map((n) => (
                        <SwiperSlide key={uuidv4()}>
                            <Card className={`item-${n}`} horizontal={horizontal} cols={3} key={uuidv4()}>
                                <div className="bg-gray-300 w-full h-24 md:h-52 lg:h-40 rounded"></div> 
                                <div className={`p-4 pt-3 md:pt-6 ${horizontal ? 'col-span-2' : ''}`}>
                                    <div className="md:hidden bg-gray-300 w-full h-3 md:h-5 rounded-sm mb-1"></div>
                                    <div className="bg-gray-300 w-5/6 h-3 md:h-5 rounded-sm md:rounded mb-3 md:m-0"></div>
                                    {
                                        !horizontal ?
                                        <>
                                        <div className="flex w-full space-x-1 my-3 items-center">
                                            <div className="bg-gray-300 w-4 h-4 rounded"></div>
                                            <div className="bg-gray-300 w-8 h-3 rounded-sm"></div>
                                            <div className="bg-gray-300 w-4 h-4 rounded"></div>
                                            <div className="bg-gray-300 w-8 h-3 rounded-sm"></div>
                                            <div className="hidden md:block bg-gray-300 w-4 h-4 rounded"></div>
                                            <div className="hidden md:block bg-gray-300 w-8 h-3 rounded-sm"></div>
                                        </div>
                                        <div className="hidden md:block bg-gray-300 w-full h-3 rounded"></div>
                                        <div className="hidden md:block bg-gray-300 w-4/5 h-3 mt-2 rounded"></div>
                                        </> :
                                        <>
                                        <div className="flex w-full items-center space-x-1 my-2 md:my-4">
                                            <div className="w-4 h-4 rounded-sm bg-gray-300"></div>
                                            <div className="w-9 md:w-12 h-2 md:h-3 bg-gray-300"></div>
                                        </div>
                                        <div className="w-10 md:w-16 h-3 bg-gray-300"></div>
                                        </>
                                    }
                                </div>       
                            </Card>
                        </SwiperSlide>
                    ))
                }
              </Swiper>)
                :
              <div className={`grid ${ horizontal ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-2 md:gap-5 lg:gap-x-4 lg:gap-y-6 xl:gap-x-3`}>
                {
                    [1,2,3,4,5,6,7,8,9,0].map(n => (
                    <Card className={`item-${n}`} horizontal={horizontal} cols={3} key={uuidv4()}>
                        <div className="bg-gray-300 w-full h-24 md:h-52 lg:h-40 rounded"></div> 
                        <div className={`p-4 pt-3 md:pt-6 ${horizontal ? 'col-span-2' : ''}`}>
                            <div className="md:hidden bg-gray-300 w-full h-3 md:h-5 rounded-sm mb-1"></div>
                            <div className="bg-gray-300 w-5/6 h-3 md:h-5 rounded-sm md:rounded mb-3 md:m-0"></div>
                            {
                                !horizontal ?
                                <>
                                <div className="flex w-full space-x-1 my-3 items-center">
                                    <div className="bg-gray-300 w-4 h-4 rounded"></div>
                                    <div className="bg-gray-300 w-8 h-3 rounded-sm"></div>
                                    <div className="bg-gray-300 w-4 h-4 rounded"></div>
                                    <div className="bg-gray-300 w-8 h-3 rounded-sm"></div>
                                    <div className="hidden md:block bg-gray-300 w-4 h-4 rounded"></div>
                                    <div className="hidden md:block bg-gray-300 w-8 h-3 rounded-sm"></div>
                                </div>
                                <div className="hidden md:block bg-gray-300 w-full h-3 rounded"></div>
                                <div className="hidden md:block bg-gray-300 w-4/5 h-3 mt-2 rounded"></div>
                                </> 
                                :
                                <>
                                <div className="flex w-full items-center space-x-1 my-2">
                                    <div className="w-4 h-4 rounded-sm bg-gray-300"></div>
                                    <div className="w-9 h-2 bg-gray-300"></div>
                                </div>
                                <div className="w-10 h-3 bg-gray-300"></div>
                                </>        
                            }
                        </div>       
                    </Card>
                    ))
                }
              </div>
            }
        </div>
    )
}


export const BannerSkeleton = () => {
    return(
        <div className="animate-pulse h-full">
            <Grid cols={3} className="w-full">
                <div className="hidden md:block md:col-span-1 pt-20 lg:pt-24">
                    <div className="bg-gray-300 h-4 w-1/2 rounded mt-1 mb-5"></div>
                    {
                        [1,2,3].map((n) => (
                            <Card horizontal cols={3} className={`item-${n} my-4 rounded mr-4`} key={uuidv4()}>
                                <div className="bg-gray-300 rounded w-full h-full"></div>
                                <div className="p-3 lg:p-5 pt-3 col-span-2">
                                    <div className="bg-gray-300 w-full h-3 rounded mb-1"></div>
                                    <div className="bg-gray-300 w-5/6 h-3 rounded"></div>
                                    <div className="bg-gray-300 w-16 h-3 mt-4 rounded"></div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
                <div className="col-span-3 md:col-span-2">
                    <div className="bg-gray-200 md:bg-gray-300 w-full h-full rounded relative">
                        <div className="md:hidden w-full absolute left-0 bottom-1/4 h-auto px-12 pt-4">
                            <div className="bg-gray-300 w-24 h-3 rounded mb-5"></div>
                            <div className="bg-gray-300 w-full h-4 rounded"></div>
                            <div className="bg-gray-300 w-5/6 h-4 rounded my-3"></div>
                            <div className="bg-gray-300 w-3/5 h-4 rounded"></div>
                            <div className="bg-gray-300 w-48 h-14 rounded-full mt-8"></div>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    )
}

export const BannerArticleSkeleton = () => {
    return(
        <div className="animate-pulse">
            <Grid cols={4}>
                <Grid cols={3} rows={4} className="col-span-3 w-full gap-x-1 gap-y-4">
                    {
                        [1,2,3,4,5,6].map(n => (
                            <Card className={`item-${n} w-full h-auto row-span-2`} key={uuidv4()}>
                                <div className="bg-gray-300 w-full h-40"></div>
                                <div className="p-4">
                                    <div className="bg-gray-300 w-full h-3 rounded"></div>
                                    <div className="bg-gray-300 w-5/6 h-3  rounded my-2"></div>
                                    <div className="flex justify-between items-center mt-5 w-full h-auto">
                                        <div className="bg-gray-300 w-2/6 h-3 rounded"></div>
                                        <div className="bg-gray-300 w-14 h-3 rounded"></div>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </Grid>
                <div className="border-l-2 border-gray-200 ml-5 pl-3">
                    <div className="bg-gray-300 w-2/4 h-4 mb-5 rounded"></div>
                    {
                        [1,2,3,4,5].map(n => (
                            <Card className={`item-${n} w-full h-auto my-3`} horizontal cols={3} key={uuidv4()}>
                                <div className="hidden lg:block bg-gray-300 w-full h-20 rounded"></div> 
                                <div className="p-3 col-span-3 lg:col-span-2">
                                    <div className="bg-gray-300 w-full h-2 rounded-sm"></div>
                                    <div className="bg-gray-300 w-3/4 h-2 rounded-sm my-2"></div>
                                    <div className="bg-gray-300 w-5/6 h-2 rounded-sm"></div>
                                </div>       
                            </Card>
                        ))
                    }
                    
                </div>
            </Grid>
        </div>
    )
}

export const ArticleSkeleton = ({type, horizontal, isMobileScreen, thumbSize}) => {
    const thumb = thumbSize || 'h-44';

    return(
        type === "card" ?
        <div className="animate-pulse">
            <Card className="w-full h-auto" horizontal={horizontal} cols={3} key={uuidv4()}>
                <div className={`block bg-gray-300 w-full ${thumb} ${isMobileScreen ? 'rounded-2xl' : 'rounded' }`}></div> 
                <div className="p-3 md:px-6 col-span-2">
                    <div className="bg-gray-300 w-full h-3 md:h-4 rounded-sm"></div>
                    <div className="bg-gray-300 w-3/4 h-3 md:h-4 rounded-sm my-2 md:my-3"></div>
                    <div className="hidden md:block bg-gray-300 w-2/6 h-3 md:h-5 md:mt-5 rounded-sm"></div>
                </div>       
            </Card>
        </div>
        :
        <div className="animate-pulse">
            <Grid cols={4} className="gap-x-2">
                {
                    [1,2,3,4].map(n => (
                        <div className={`item-${n} bg-gray-300 w-full h-44`} key={uuidv4()}></div>
                    ))
                }
            </Grid>
        </div>
    )
}

export const BannerDetailSkeleton = ({type}) => {
    return(
        <div className="h-80 md:h-auto animate-pulse">
            <Grid cols={3} className="h-full md:min-h-screen">
                <div className="hidden md:block col-span-1 md:pt-24 lg:pt-28 p-8">
                    
                    {
                        type === "resep" ?
                        <>
                        <div className="bg-gray-300 w-5/6 h-7 rounded mb-3"></div>
                        <div className="my-5">
                            <Grid cols={3} className="mb-5">
                                <div className="w-full p-3">
                                    <div className="bg-gray-300 w-12 h-3 rounded-sm"></div>
                                    <div className="flex items-center w-full mt-2">
                                        <div className="bg-gray-300 w-7 h-7 rounded-full mr-1"></div>
                                        <div className="bg-gray-300 w-12 h-4 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="w-full p-3 border-l border-r border-gray-300">
                                    <div className="bg-gray-300 w-12 h-3 rounded-sm"></div>
                                    <div className="flex items-center w-full mt-2">
                                        <div className="bg-gray-300 w-7 h-7 rounded-full mr-1"></div>
                                        <div className="bg-gray-300 w-12 h-4 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="w-full p-3">
                                    <div className="bg-gray-300 w-12 h-3 rounded-sm"></div>
                                    <div className="flex items-center w-ful mt-2">
                                        <div className="bg-gray-300 w-7 h-7 rounded-full mr-1"></div>
                                        <div className="bg-gray-300 w-12 h-4 rounded-sm"></div>
                                    </div>
                                </div>
                            </Grid>
                            <div className="bg-gray-300 w-20 h-3 rounded-sm my-2"></div>
                            <div className="bg-gray-300 w-1/2 h-4 rounded-sm my-2"></div>
                        </div>
                        </>
                        :
                        <>
                        <div className="bg-gray-300 w-5/6 h-6 rounded"></div>
                        <div className="bg-gray-300 w-full h-6 rounded my-4"></div>
                        <div className="bg-gray-300 w-3/4 h-6 rounded"></div>
                        <div className="mt-8">
                            <div className="flex items-center w-full mb-2">
                                <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
                                <div className="bg-gray-300 w-24 h-4 rounded-sm"></div>
                            </div>
                            <div className="flex items-center w-full">
                                <div className="bg-gray-300 w-6 h-6 rounded-full mr-2"></div>
                                <div className="bg-gray-300 w-44 h-4 rounded-sm"></div>
                            </div>
                        </div> 
                        </>
                    }
                </div>
                <div className="col-span-3 md:col-span-2 bg-gray-300 w-full h-full md:h-5/6 md:rounded-bl-2xl"></div>
            </Grid>

        </div>
    )
}

export const TextSkeleton = () => {
    return(
        <div className="w-full animate-pulse mb-10">
            {
                [1,2,3,4].map(n => (
                    <div className={`item-${n} bg-gray-300 w-full md:w-11/12 h-2 md:h-4 my-2 md:my-3`} key={uuidv4()}></div>
                ))
            }
        </div>

    )
}