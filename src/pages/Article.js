import React, { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import Grid from '../elements/Grid';
import Card from '../elements/Card';
import useFetch from '../hooks/useFetch';
import { Button } from '../elements/Button';
import { ArticleList } from '../parts/ArticleList';
import { Modal } from '../elements/Modal'
import { BookmarkIcon, ShareIcon, StatusOfflineIcon, TagIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Controller } from 'swiper';
import { ArticleSkeleton, BannerArticleSkeleton, CardSkeleton } from '../elements/Skeleton';
import 'swiper/swiper-bundle.css';

export const Article = () => {
    const [deviceScreen, setDeviceScreen] = useState(false);
    const [articles, setArticles] = useState(null);

    // install Swiper modules
    SwiperCore.use([Navigation, Autoplay, Controller]);
    // store controlled swiper instance
    const [controllerSwiperTop, setControllerTopSwiper] = useState(null);
    const [controllerSwiperBottom, setControllerBottomSwiper] = useState(null);

    // Request Articles 
    const {data:articlesA, load: loadA, error: errorMessageA } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/categorys/article/makanan-gaya-hidup', 'GET');
    const {data:articlesB, load: loadB, error: errorMessageB } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/categorys/article/inspirasi-dapur', 'GET');
    const {data:articlesC, load: loadC, error: errorMessageC } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/categorys/article/tips-masak', 'GET');

    // Check the user device screen
    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }    
    }, []);

    
    useEffect(() => {
        const topLists = mergeData(articlesA, articlesB);
        setArticles(topLists);

    }, [articlesA, articlesB, articlesC]);
    

    const mergeData = (dataA, dataB) => {
        if (!dataA || !dataB ) return null;
        let article1, article2;

        article1 = dataA.slice(0, 3);
        article2 = dataB.slice(0, 3);

        return [...article1, ...article2];

    }
    

    return(
            <>
            { deviceScreen ?
                <>
                <div className="wrapper bg-gray-100">
                    <div className="container mx-auto font-body">
                        <div className="fixed top-0 bg-white w-full text-center z-50">
                            <div className="w-full text-center py-3 border-b border-gray-100">
                                <h1 className="inline-block text-lg text-gray-500 font-ui font-bold">Artikel</h1>
                            </div>
                            <Swiper 
                                slidesPerView={3} 
                                centeredSlides={true}
                                spaceBetween={2} 
                                onSwiper={setControllerTopSwiper}
                                controller={{control: controllerSwiperBottom}}
                                className="h-14 w-full"
                                >
                                <SwiperSlide className="h-auto flex justify-center items-center">
                                {({ isActive }) => (<h3 className={`text-gray-400 text-sm font-ui transition duration-300 ${isActive ? 'font-bold text-secondary' : ''}`}>Untukmu</h3>)}
                                </SwiperSlide>
                                <SwiperSlide className="h-auto flex justify-center items-center">
                                {({ isActive }) => (<h3 className={`text-gray-400 text-sm font-ui transition duration-300 ${isActive ? 'font-bold text-secondary' : ''}`}>Inspirasi</h3>)}
                                </SwiperSlide>
                                <SwiperSlide className="h-auto flex justify-center items-center">
                                {({ isActive }) => (<h3 className={`text-gray-400 text-sm font-ui transition duration-300 ${isActive ? 'font-bold text-secondary' : ''}`}>Masakan</h3>)}
                                </SwiperSlide>
                                <SwiperSlide className="h-auto flex justify-center items-center">
                                {({ isActive }) => (<h3 className={`text-gray-400 text-sm font-ui transition duration-300 ${isActive ? 'font-bold text-secondary' : ''}`}>Tips Masak</h3>)}
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            autoHeight
                            className="w-full min-h-screen mt-28"
                            onSwiper={setControllerBottomSwiper}
                            controller={{ control: controllerSwiperTop }}
                            >
                            <SwiperSlide className="article-slide px-6">
                                <Swiper slidesPerView={1} spaceBetween={20} autoplay className="h-2/5 mt-2">
                                    { !articles && !errorMessageA ?
                                        (
                                        <div className="bg-white rounded-2xl p-4 my-2">
                                            <ArticleSkeleton type="card" isMobileScreen /> 
                                        </div>
                                        )
                                        : ''
                                    }
                                    { errorMessageC && <div className="bg-white rounded-2xl p-4 my-2 flex justify-center items-center w-full h-32 text-base text-gray-600">{errorMessageC}</div>}
                                    {   articles && articles.map(item =>
                                        (<SwiperSlide className="bg-white p-4 rounded-2xl" key={uuidv4()}>
                                            <div>
                                                <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                    <figure className="h-1/2 w-full rounded-2xl overflow-hidden">
                                                        <img src={item.thumb} className="h-full w-full object-cover object-center" alt={item.key}/>
                                                    </figure>
                                                    <figcaption className="py-4">
                                                        <h1 className="text-md font-ui font-bold leading-tight text-gray-600">{item.title}</h1>
                                                        <p className="text-primary-light text-xs mt-3">
                                                            <span className="bg-gray-100 p-1 rounded-sm">
                                                                <TagIcon className="inline-block h-4 w-7 text-gray-300" />{item.tags}
                                                            </span>
                                                        </p>
                                                    </figcaption>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        ))
                                    }
                                    
                                </Swiper>
                                <section className="popular mt-5 bg-white rounded-2xl p-4 mb-4">
                                    <div className="mb-3">
                                        <h1 className="inline-block text-md text-gray-600 font-semibold border-b-2 border-primary pb-2">Artikel Terkini</h1>
                                    </div>
                                    { loadC && <CardSkeleton horizontal /> }
                                    {  articlesC &&
                                        <div className="popular-list">
                                            <ArticleList articles={articlesC.slice(0, 6)} />
                                        </div>
                                    }
                                </section>
                            </SwiperSlide>
                            <SwiperSlide className="article-slide px-6">
                                <section className="inspiration">
                                    { errorMessageB && <div className="flex justify-center items-center w-full h-40 text-base text-gray-600">{errorMessageB}</div>}
                                    { loadB && 
                                        [1,2,3,4,5,6].map(n => (
                                            <div className="bg-white rounded-2xl p-4 my-3" key={uuidv4()}>
                                                <ArticleSkeleton type="card" isMobileScreen /> 
                                            </div>
                                        ))
                                    }
                                    {  articlesB && articlesB.map( item =>
                                        (<div className="inspiration-list bg-white p-4 rounded-2xl my-3" key={uuidv4()}>
                                            <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                <figure className="h-2/5 w-full rounded-2xl overflow-hidden">
                                                    <img src={item.thumb} className="h-full w-full object-cover object-center" alt={item.key}/>
                                                </figure>
                                                <figcaption className="pt-4 pb-2">
                                                    <h1 className="text-md font-ui font-bold leading-tight text-gray-600">{item.title}</h1>
                                                </figcaption>
                                            </Link>
                                            <div className="flex justify-end items-center">
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <BookmarkIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <ShareIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        ))
                                    }
                                </section>
                            </SwiperSlide>
                            <SwiperSlide className="article-slide px-6">
                                <section className="foodlife">
                                    { errorMessageA && <div className="flex justify-center items-center w-full h-40 text-base text-gray-600">{errorMessageA}</div> }
                                    { loadA && 
                                        [1,2,3,4,5,6].map(n => (
                                            <div className="bg-white rounded-2xl p-4 my-3" key={uuidv4()}>
                                                <ArticleSkeleton type="card" isMobileScreen /> 
                                            </div>
                                        ))
                                    }
                                    {  articlesA && articlesA.map( item =>
                                        (<div className="food-list bg-white p-4 rounded-2xl my-3" key={uuidv4()}>
                                            <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                <figure className="h-2/5 w-full rounded-2xl overflow-hidden">
                                                    <img src={item.thumb} className="h-full w-full object-cover object-center" alt={item.key}/>
                                                </figure>
                                                <figcaption className="pt-4 pb-2">
                                                    <h1 className="text-md font-ui font-bold leading-tight text-gray-600">{item.title}</h1>
                                                </figcaption>
                                            </Link>
                                            <div className="flex justify-end items-center">
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <BookmarkIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <ShareIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        ))
                                    }
                                </section>
                            </SwiperSlide>
                            <SwiperSlide className="article-slide px-6">
                                <section className="cooktips">
                                    { errorMessageC && <div className="flex justify-center items-center w-full h-40 text-base text-gray-600">{errorMessageC}</div>}
                                    { loadC && 
                                        [1,2,3,4,5,6].map(n => (
                                            <div className="bg-white rounded-2xl p-4 my-3" key={uuidv4()}>
                                                <ArticleSkeleton type="card" isMobileScreen /> 
                                            </div>
                                        ))
                                    }
                                    {  articlesC && articlesC.map( item =>
                                        (<div className="cooktips-list bg-white p-4 rounded-2xl my-3" key={uuidv4()}>
                                            <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                <figure className="h-2/5 w-full rounded-2xl overflow-hidden">
                                                    <img src={item.thumb} className="h-full w-full object-cover object-center" alt={item.key}/>
                                                </figure>
                                                <figcaption className="pt-4 pb-2">
                                                    <h1 className="text-md font-ui font-bold leading-tight text-gray-600">{item.title}</h1>
                                                </figcaption>
                                            </Link>
                                            <div className="flex justify-end items-center">
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <BookmarkIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                                <button className="bg-transparent outline-none border-none p-2">
                                                    <ShareIcon className="w-6 h-6 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                        ))
                                    }
                                </section>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                </>
                
                :

                <>
                <div className="wrapper bg-gray-50">
                    <div className="container mx-auto font-body">
                        <section className="py-2 px-6 mt-6 md:p-8 pt-18 mt-16 font-body">
                            <div className="mb-3 md:mb-8">
                                <h1 className="inline-block text-md md:text-2xl text-gray-600 font-semibold border-b-2 border-primary pb-2">Artikel Terkini</h1>
                            </div>
                       
                        { !articles && !errorMessageA ? <BannerArticleSkeleton /> : '' }
                        { errorMessageA && <div className="flex justify-center items-center w-full h-full text-xl text-gray-600">{errorMessageA}</div>}
                        {   articles &&
                            <Grid cols={4}>
                                <Grid cols={3} rows={4} className="col-span-3 grid-flow-col w-full gap-x-1 gap-y-1">
                                    { 
                                        articles.map((item) => {
                                            let withThumbnail = true;
                                            return(
                                                <div className="row-span-2 pb-4" key={uuidv4()}>
                                                    <Card overFlow className="h-full bg-white">
                                                        <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                            { withThumbnail ? 
                                                                <figure className="h-40 relative">
                                                                    <div className="absolute left-0 bottom-0 w-full h-full bg-gradient-to-t from-black opacity-40"></div>
                                                                    <img src={item.thumb} alt={item.key} className="h-full w-full object-cover object-center" />
                                                                </figure> : ''
                                                            }
                                                            <figcaption className="p-4">
                                                                <h1 className="font-bold font-ui text-gray-600 text-base leading-tight mb-5">{item.title}</h1>
                                                                <p className="text-primary-light font-ui text-xs flex justify-between items-center">
                                                                    <span className="inline-block bg-gray-100 p-1 rounded-sm font-bold">
                                                                        {item.tags}
                                                                    </span>
                                                                    <span className="inline-block text-gray-400 text-right text-xs md:text-sm">Read More..</span>
                                                                </p>
                                                            </figcaption>
                                                        </Link>
                                                    </Card>
                                                </div>
                                            )
                                            
                                        })
                                    }
                                </Grid>
                                <div className="border-l-2 border-gray-200 ml-5">
                                    <div className="mb-3 md:mb-5">
                                        <h1 className="inline-block text-md text-md text-gray-600 font-semibold border-l-4 border-red-400 pl-2">
                                            Most Popular
                                        </h1>
                                    </div>
                                    <div className="pl-3">
                                    { articlesC &&
                                        <ArticleList isSide articles={articlesC.slice(0, 5)} />
                                    }
                                    </div>
                                </div>
                            </Grid>
                        }
                        </section>
                    </div>
                </div>
                <div className="container mx-auto">
                    <section className="py-4 px-8 mt-8 md:p-8">
                        <div className="mb-3 md:mb-8">
                            <h1 className="inline-block text-md lg:text-lg text-gray-600 font-body font-semibold border-b-2 border-primary pb-2">
                                Inspirasi Dapur
                            </h1>
                        </div>
                            { loadB &&  <ArticleSkeleton />  }
                            { errorMessageB && <div className="flex justify-center items-center w-full h-full text-xl text-gray-600">{errorMessageB}</div>}
                            {  articlesB &&
                                <Swiper
                                spaceBetween={5}
                                slidesPerView={4}
                                grabCursor
                                breakpoints={{ 
                                    320: {
                                        slidesPerView: 2
                                    },
                                    480: {
                                        slidesPerView: 3
                                    },
                                    1024: {
                                        slidesPerView: 4
                                    }
                                }}
                               >
                                { articlesB.map(item => (
                                   <SwiperSlide className="h-auto relative">
                                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-90"></div>
                                        <figure className="h-44 overflow-hidden">
                                            <img src={item.thumb} alt={item.key} className="w-full h-full object-cover object-center" />
                                        </figure>
                                        <figure className="absolute bottom-0 left-0 p-4 font-ui">
                                            <h1 className="text-sm xl:text-base md:leading-tight tracking-wide font-semibold text-gray-50">
                                                <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                    {item.title.split(" ").length > 6 ? item.title.split(6).join(" ")+`..` : item.title }
                                                </Link>
                                            </h1>
                                        </figure>
                                   </SwiperSlide>
                                ))
    
                                }
                               </Swiper> 
                            }
                    </section>
                    <section className="py-2 px-6 mt-8 md:p-8">
                        <div className="mb-3 md:mb-8">
                            <h1 className="inline-block text-md lg:text-lg text-gray-600 font-body font-semibold border-b-2 border-primary pb-2">
                            Makanan &amp; Gaya Hidup
                            </h1>
                        </div>
                    { errorMessageA && <div className="flex justify-center items-center w-full h-full text-xl text-gray-600">{errorMessageA}</div>}
                    { loadA && <ArticleSkeleton /> }
                    {  articlesA && 
                           <Swiper
                            spaceBetween={5}
                            slidesPerView={4}
                            grabCursor
                            breakpoints={{ 
                                320: {
                                    slidesPerView: 2
                                },
                                480: {
                                    slidesPerView: 3
                                },
                                1024: {
                                    slidesPerView: 4
                                }
                            }}
                           >
                            { articlesA.map(item => (
                               <SwiperSlide className="relative">
                                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-90"></div>
                                    <figure className="h-44 overflow-hidden">
                                        <img src={item.thumb} alt={item.key} className="w-full h-full object-cover object-center" />
                                    </figure>
                                    <figure className="absolute bottom-0 left-0 p-4 font-ui">
                                        <h1 className="text-sm lg:text-base md:leading-tight tracking-wide font-semibold text-gray-50">
                                            <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                {item.title.split(" ").length > 6 ? item.title.split(6).join(" ")+`..` : item.title }
                                            </Link>
                                        </h1>
                                    </figure>
                               </SwiperSlide>
                            ))

                            }
                           </Swiper> 
                    
                    }
                    </section>
                    <section className="py-2 px-6 md:p-8">
                        <div className="mb-3 md:mb-8">
                            <h1 className="inline-block text-md lg:text-lg text-gray-600 font-body font-semibold border-b-2 border-primary pb-2">
                            Tips Masak
                            </h1>
                        </div>
                        { loadC && <ArticleSkeleton /> }
                        { errorMessageC && <div className="flex justify-center items-center w-full h-full text-xl text-gray-600">{errorMessageC}</div>}
                        {  articlesC &&
                            <Swiper
                            spaceBetween={5}
                            slidesPerView={4}
                            grabCursor
                            breakpoints={{ 
                                320: {
                                    slidesPerView: 2
                                },
                                480: {
                                    slidesPerView: 3
                                },
                                1024: {
                                    slidesPerView: 4
                                }
                            }}
                           >
                            { articlesC.map(item => (
                               <SwiperSlide className="relative">
                                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-90"></div>
                                    <figure className="h-44 overflow-hidden">
                                        <img src={item.thumb} alt={item.key} className="w-full h-full object-cover object-center" />
                                    </figure>
                                    <figure className="absolute bottom-0 left-0 p-4 font-ui">
                                        <h1 className="text-sm lg:text-base md:leading-tight tracking-wide font-semibold text-gray-50">
                                            <Link to={`/artikel/${item.tags.toLowerCase().split(" ").join("-")}/${item.key}`}>
                                                {item.title.split(" ").length > 6 ? item.title.split(6).join(" ")+`..` : item.title }
                                            </Link>
                                        </h1>
                                    </figure>
                               </SwiperSlide>
                            ))

                            }
                           </Swiper> 
                        }
                    </section>
                </div>
             </>
                
            }
            {   errorMessageC &&
                 <Modal>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-300 inline-block" />
                        <p className="text-gray-400 tracking-wide capitalize mb-2">{errorMessageA}</p>
                        <Button onClick={()=> window.location.reload()} Rounded Secondary Bordered className="px-8 py-2 my-4">
                            Refresh
                        </Button>
                    </div>
                </Modal>       
            }
        </>
    );
}
