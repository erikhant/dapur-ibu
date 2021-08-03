import React, { useState } from 'react'
import Grid from '../elements/Grid';
import BannerContent from '../elements/BannerContent';
import BannerImage from '../assets/img/banner-primary.png';
import { Button } from "../elements/Button";
import {v4 as uuidv4} from 'uuid';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckCircleIcon, ChartPieIcon, UserCircleIcon, CalendarIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, EffectFade, Controller } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.min.css';
import "swiper/components/pagination/pagination.min.css"
import Card from '../elements/Card';
import { SearchInput } from '../elements/SearchInput';



// ######################  Home Banner ###########################


export const HomeBanner = ({isDeviceScreen}) => {
    
    const bannerHome = {
        title : {
            caption: 'Aneka resep rahasia kami bagikan untuk Anda',
            color: 'text-primary-dark',
            margin: 'mb-6'
        },
        text : {
            caption: 'Berbagai menu menarik khas Nusantara dari yang terpopuler hingga terbaru bisa kamu temukan dengan mudah tanpa ribet. Cari aja dulu, baru masak!',
            color: 'text-green-500 md:text-gray-500',
            margin: 'mb-8'
        },
        navButton : {
            path: '/',
            text: 'Explore All',
            rounded: true
        },
        imgSrc: BannerImage
    }
    
    return(
        <Grid cols={3} className={isDeviceScreen ? "h-full": ''}>
            <BannerContent 
                title={bannerHome.title}
                text={bannerHome.text}
                colSpan={isDeviceScreen ? 3 : 1}
                className={`p-8 ${isDeviceScreen ? 'h-full text-center flex flex-col justify-center items-center pt-48 bg-primary-light' : 'pl-10 mt-28'}`}
            >
                { isDeviceScreen ?
                    <>
                    <img src={bannerHome.imgSrc } className="h-2/5 object-cover object-center absolute left-1/2 top-6 transform -translate-x-1/2 opacity-80" alt="banner" />
                    {/* <div className="absolute left-0 bottom-0 w-full h-5/6 bg-gradient-to-t from-black"></div> */}
                    </>
                    : 
                    <div className="flex items-center w-full mt-8 md:mt-12 h-14">
                        <SearchInput hasIcon isRounded isWide placeholder="Temukan masakan favoritmu" className="h-full" />
                    </div>
                }
            </BannerContent>
            {   !isDeviceScreen ? 
                <BannerContent colSpan={2}>
                    <div className="p-16">
                        <img src={bannerHome.imgSrc } className="w-full object-cover object-center" alt="banner" />
                    </div>
                </BannerContent>
                : ''
            }
        </Grid>
    );   
}


// ####################  Recipe Banner #########################

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, EffectFade, Controller]);

export const RecipeBanner = ({isDeviceScreen, data}) => {

    const [controllerSwiper, setControllerSwiper] = useState(null);
    
    return(
        <Grid cols={3}>
            { isDeviceScreen ? '' 
            :
            <BannerContent 
                colSpan={1}
                className="p-6 pr-2 mt-20"
                title={{caption: 'Top List minggu ini', size:'text-xl text-left', margin: 'mb-4'}}
                style={{height: '30rem'}}
            >   
               
                <Swiper
                    id="main-swiper" 
                    direction={"vertical"}
                    slidesPerView={3}
                    spaceBetween={2}
                    speed={800}
                    autoplay
                    controller={{ control: controllerSwiper }}
                    className="trending-recipe-swipe h-full"
                >   
                    { data.map((item, index) => 
                        <SwiperSlide key={uuidv4()}>
                            <Card isRounded hasShadow horizontal overFlow cols={3} className="p-0" >
                                 <div className="md:hidden lg:block top-list border-r-4 border-gray-50 h-auto relative">
                                    <div className="border-2 border-gray-50 bg-secondary-dark absolute left-1 top-1 h-8 w-8 flex justify-center items-center rounded-full">
                                        <h1 className="text-xl font-bold text-gray-50">{index + 1}</h1>
                                    </div>
                                    <img src={item.thumb} className="min-h-full object-cover object-center" alt={item.key} />
                                 </div>
                                 <BannerContent colSpan={2} 
                                                isSide
                                                title={{
                                                        caption: item.title.split(" ").length >= 10 ? item.title.split(" ", 10).join(" ")+'...' : item.title,
                                                        size: 'text-sm leading-tight font-ui',
                                                        margin: 'mb-2',
                                                        color: 'text-gray-600'
                                                }}
                                                className="p-5 relative"
                                                >
                                    <Link to={`/resep/${item.key}`} className="text-sm text-primary-dark font-bold">
                                            Lihat Resep
                                    </Link>
                                </BannerContent>
                            </Card>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
            </BannerContent>
            }
            <BannerContent 
                colSpan={isDeviceScreen ? 3 : 2} 
                className="relative max-h-screen" 
                style={{minHeight: '35rem'}}>
                
                <Swiper 
                    direction={isDeviceScreen ? "horizontal" : "vertical"}
                    slidesPerView={1}
                    spaceBetween={0}
                    effect={"fade"}
                    speed={isDeviceScreen ? 400 : 800}
                    autoplay={ isDeviceScreen ? true : false}
                    onSwiper={setControllerSwiper}
                    className="trending-recipe-swipe h-full"
                    >
                    { data.map((item, index )=> 
                        <SwiperSlide key={uuidv4()}>
                            <div className="mt-16 h-screen relative">
                                <div className="overlay absolute left-0 bottom-0 w-full h-full md:h-5/6 bg-gradient-to-t from-black opacity-80"></div>
                                <div className="lg:hidden border-2 border-gray-50 absolute left-5 top-7 h-7 w-7 flex justify-center items-center rounded-full" style={{background:'#4aa96c'}}>
                                        <h1 className="text-lg font-bold text-gray-50">{index + 1}</h1>
                                </div>
                                <div className="desc absolute bottom-56 left-0 px-10 lg:px-14 z-20">
                                    {isDeviceScreen ? <span className="inline-block text-yellow-400 font-bold text-sm pb-3">Top List minggu ini:</span> : ''}
                                    <h1 className="font-body font-bold text-white text-xl md:text-2xl lg:text-4xl mb-6 lg:mb-9" style={{textShadow: '0 2px 4px rgba(0,0,0,0.20)'}}>{item.title}</h1>
                                    <Link to={`/resep/${item.key}`} className="inline-block">
                                        <Button Rounded type="secondary" className="px-8 lg:px-8 py-3 lg:py-4 tracking-wider font-bold flex justify-between items-center">
                                            <span>LIHAT RESEP</span>
                                            <ArrowCircleRightIcon className="h-7 w-9" />
                                        </Button>
                                    </Link>
                                </div>
                                <img src={item.thumb} className="w-full h-full object-cover object-center" alt={item.key} />   
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </BannerContent>
            
        </Grid>
    );   
}

// #################### Article Banner #########################

export const ArticleBanner = ({articles, isDeviceScreen}) => {
    return(
        <div className="w-full h-48 lg:h-80">
            <Swiper 
                    spaceBetween={12} 
                    slidesPerView={1} 
                    pagination={{clickable: true}}
                    autoplay
                    loop 
                    className="h-full"
                    >
                {  
                articles && articles.map(article => (
                    <SwiperSlide key={uuidv4()} className="overflow-hidden">
                        <Grid cols={1}>
                            <BannerContent 
                                title={{
                                    caption: article.title,
                                    color: "text-gray-100 md:text-gray-700",
                                    padding: 'p-3 md:px-8 lg:py-5 xl:pl-12 font-ui',
                                    size: 'text-md md:text-xl lg:text-2xl leading-tight md:leading-normal w-3/4 md:w-1/2',
                                    position: 'absolute top-20 md:top-0 left-0 md:left-1/2 lg:top-6 xl:left-1/3'
                                }}
                                className="relative md:bg-gray-50"
                                >
                                <div className="p-3 md:p-6 absolute top-28 right-1 md:top-24 lg:right-80 xl:right-1/2 lg:top-32 z-10">
                                    <Link to={`/artikel/${article.tags.toLowerCase().split(" ").join("-")}/${article.key}`}>
                                        <Button Rounded Bordered={isDeviceScreen ? false : true} className="px-4 py-2 md:px-6 text-xs md:text-base text-gray-100 md:text-yellow-500">Read More</Button>
                                    </Link>
                                </div>
                                <div className="absolute left-0 top-14 md:top-0 md:-left-1/3 h-5/6 lg:h-full w-full bg-gradient-to-t md:bg-gradient-to-l from-black md:from-gray-50 md:opacity-90 lg:opacity-0"></div>
                                <img src={article.thumb} className="h-full w-full md:w-auto object-cover object-center" alt={article.key} />
                            </BannerContent>
                        </Grid>
                    </SwiperSlide>
                ))
                }
                </Swiper> 
            
        </div>
    );
}



// #################### Article Detail Banner #########################

export const ArticleDetailBanner = ({
        isDeviceScreen, 
        title, 
        thumb, 
        author, 
        date_published
    }) => {

    const articleDetail = {
            leftTitle: {
                caption: title,
                color: 'md:text-gray-700',
                size: 'text-lg md:text-2xl lg:text-4xl'
            },
            rightTitle: {
                caption: title,
                color: 'text-primary-light md:text-gray-800',
                size: 'text-lg md:text-2xl lg:text-4xl',
                position: 'absolute bottom-0 left-0',
                padding: 'p-5'
            },
            thumb: thumb,    
            author: author, 
            date: date_published,
    }

    return(
        <Grid cols={3} className="relative">
            { isDeviceScreen ? ''
                :
            <BannerContent 
                title={articleDetail.leftTitle}
                colSpan={1}
                className="p-8 pb-24 mt-32 md:mt-20"
            >  
                <div className="flex flex-wrap md:my-6 relative z-10">
                    <p className="inline-block text-gray-600 mr-3">
                        <UserCircleIcon className="inline-block text-sm md:text-base h-5 w-7 md:h-8 md:w-10" />{articleDetail.author}
                    </p>
                    <p className="inline-block text-gray-600 mr-3">
                        <CalendarIcon className="inline-block text-sm md:text-base h-5 w-7 md:h-8 md:w-10" /> dipublikasi pada {articleDetail.date}
                    </p>
                </div>
            </BannerContent>
            }
            <BannerContent title={isDeviceScreen ? articleDetail.rightTitle : null} colSpan={isDeviceScreen ? 3 : 2} className="h-80 md:h-full relative md:rounded-bl-2xl overflow-hidden">
                <div className="absolute left-0 bottom-0 w-full h-3/5 bg-gradient-to-t from-black opacity-60"></div>
                <img src={articleDetail.thumb} className={`w-full h-full object-cover object-center ${!isDeviceScreen ? 'mt-10' : ''} `} alt="banner" />
            </BannerContent>
           
        </Grid>
    );   
}


export const RecipeDetailBanner = ({
        isDeviceScreen, 
        leftTitle, 
        rightTitle, 
        thumb, 
        servings, 
        dificulty, 
        times, 
        needItem, 
        author, 

    }) => {

    const recipeBanner = {
        leftTitle: {
            caption: leftTitle,
            color: 'text-primary-dark',
            size: 'text-lg md:text-2xl',
           
        },
        rightTitle: {
            caption: rightTitle,
            color: 'text-white',
            size: 'text-lg md:text-2xl lg:text-4xl',
            position: 'absolute bottom-8 md:bottom-0 left-0',
            padding: 'p-5 lg:px-8 lg:py-10',
            textShadow: true
        },
        thumb,    
        author,
        servings,
        dificulty, 
        times, 
        needItem
    }

    return(
        <Grid cols={3} className="relative">
            { isDeviceScreen ? '' 
                :
                <BannerContent 
                    title={recipeBanner.leftTitle}
                    colSpan={1}
                    className="p-8 md:mt-20"
                >   
                        <div className="lg:flex justify-between w-full mt-3">
                            <div className="xl:border-r border-gray-200 pr-5 mb-3">
                                <p className="text-xs text-gray-400 mb-1">Estimasi waktu:</p>
                                <span className="flex items-center text-primary-dark text-md font-ui font-bold">
                                    <ClockIcon className="h-6 w-6 mr-1 text-gray-400" />
                                    {recipeBanner.times}
                                </span>    
                            </div>
                            <div className="xl:border-r border-gray-200 pr-5 mb-3">
                                <p className="text-xs text-gray-400 mb-1">Porsi:</p>
                                <span className="flex items-center text-primary-dark text-md font-ui font-bold">
                                    <ChartPieIcon className="h-6 w-6 mr-1 text-gray-400" />{recipeBanner.servings}
                                </span>    
                            </div>
                            <div className="pr-3 mb-3">
                                <p className="text-xs text-gray-400 mb-1">Tingkat kesulitan:</p>
                                <span className="flex items-center text-primary-dark text-md font-ui font-bold">
                                    <CheckCircleIcon className="h-6 w-6 mr-1 text-gray-400" />{recipeBanner.dificulty}
                                </span>    
                            </div>
                        </div>
                        <p className="text-sm lg:text-md text-gray-400 mt-6 mb-8">
                            <span className="text-xs text-gray-400 mb-1 block">Bahan khusus:</span>
                          {recipeBanner.needItem.map((item)=>
                                (<span key={uuidv4()}>{item.item_name},</span>)
                          )}
                        </p>
                </BannerContent>
            }
                <BannerContent title={recipeBanner.rightTitle} colSpan={isDeviceScreen ? 3 : 2} className="h-80 md:h-full relative md:rounded-bl-2xl overflow-hidden">
                    {   isDeviceScreen ? 
                        <div className="absolute flex justify-between items-start left-0 bottom-0 z-10">
                        <div className="flex justify-between p-5 pt-3">
                            <div className="pr-3">
                                <span className="flex items-center text-white text-sm">
                                    <ClockIcon className="h-6 w-6 mr-1 text-white" />
                                    {recipeBanner.times}
                                </span>    
                            </div>
                            <div className="pr-3">
                                <span className="flex items-center text-white text-sm">
                                    <ChartPieIcon className="h-6 w-6 mr-1 text-white" />{recipeBanner.servings}
                                </span>    
                            </div>
                            <div className="pr-3">
                                <span className="flex items-center text-white text-sm">
                                    <CheckCircleIcon className="h-6 w-6 mr-1 text-white" />{recipeBanner.dificulty}
                                </span>    
                            </div>
                        </div>
                    </div>
                    : ''
                    }
                    <div className="absolute left-0 bottom-0 w-full h-3/5 bg-gradient-to-t from-black opacity-70"></div>
                    { recipeBanner.thumb ? 
                            (<img src={recipeBanner.thumb} className={`w-full min-h-full object-cover object-center ${ !isDeviceScreen ? 'mt-10' : '' }`} alt={leftTitle} />) 
                                : 
                            (<div className="h-full w-full flex justify-center items-center">
                                <div className="flex justify-center items-center mt-8 md:mt-0 h-52 w-52 md:h-28 md:w-28 rounded-full shadow-md text-gray-500 text-sm font-bold bg-gray-100">No Image</div>
                            </div>) 
                    }
                </BannerContent>
                
            
        </Grid>
    );   
}
