import React from 'react';
import propTypes from 'prop-types';
import Card from '../elements/Card';
import Content from '../elements/BannerContent';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { TagIcon } from '@heroicons/react/outline';
import {v4 as uuidv4} from 'uuid';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';


export const ArticleList = ({tags, isSwipe, isSide, articles, isLoop}) => {

    SwiperCore.use([Autoplay]);

    return (
        <>
            { isSwipe ?  
                ( <Swiper 
                    spaceBetween={5} 
                    slidesPerView={1} 
                    loop={isLoop}
                    speed={500}
                    grabCursor
                    breakpoints={{ 
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 5
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }}
                    className="h-auto"
                    >
                {  
                articles && articles.map(article => (
                    (<SwiperSlide key={uuidv4()}>
                        <Link to={`/artikel/${article.tags.toLowerCase().split(" ").join("-")}/${article.key}`} onClick={()=> window.scrollTo(0, 0)}>
                            <Card horizontal Bordered isRounded overFlow cols={4}>
                                <figure className="col-span-1">
                                    <img src={article.thumb} alt={article.key} className="h-full w-full object-center object-cover" />
                                </figure>
                                <figcaption className="col-span-3 px-4 py-5">
                                    <h1 className="font-bold font-ui text-gray-600 text-sm leading-tight mb-3">
                                        {article.title}
                                    </h1>
                                    { tags ?
                                            <p className="text-primary-light mb-1 md:mb-2" style={{fontSize: '0.65rem'}}>
                                                <span className="bg-gray-100 p-1 rounded-md">
                                                    <TagIcon className="inline-block h-4 h-4 text-gray-300 mr-1" />
                                                    {article.tags}
                                                </span>
                                            </p>
                                            : ''
                                    }
                                    <span className="ml-1 md:ml-2 text-primary-dark text-xs md:text-sm font-bold">Read More..</span>
                                </figcaption>
                            </Card>
                        </Link>
                    </SwiperSlide>)
                    ))
                }
                </Swiper> 
                )

                :

                (articles && articles.map(article => ( 
                    <Link to={`/artikel/${article.tags.toLowerCase().split(" ").join("-")}/${article.key}`} key={uuidv4()} onClick={()=> window.scrollTo(0, 0)}>
                        <Card isRounded Bordered horizontal cols={3} className="p-0 mb-3" overFlow >
                            <figure className={ isSide ? "hidden lg:block col-span-1 h-full" : "col-span-1 h-full"}>
                                <img src={article.thumb} className="min-h-full object-cover object-center" alt={article.key} />
                            </figure>
                            <Content colSpan={2} className="p-3" isSide>
                                    <h1 className="text-gray-600 text-sm font-bold font-ui leading-tight">
                                        {article.title.split(" ").length >= 10 ? article.title.split(" ", 10).join(" ")+'..' : article.title } 
                                    </h1>
                                    { tags ?
                                        <p className="text-primary-light mt-3 mb-1 md:mb-3" style={{fontSize: '0.65rem'}}>
                                            <span className="bg-gray-100 p-1 rounded-md">
                                                <TagIcon className="inline-block h-4 h-4 text-gray-300 mr-1" />
                                                {article.tags}
                                            </span>
                                        </p>
                                        : ''
                                    }
                                    { !isSide ? (<span className="ml-1 md:ml-2 text-primary-dark text-xs md:text-sm">Read More..</span>)
                                        :
                                        ''
                                    }
                            </Content>
                        </Card>
                    </Link> ))
                )
            }
        </>

    );
}


ArticleList.propTypes = {
    isDeviceScreen: propTypes.bool,
    tags: propTypes.bool,
    isSwipe: propTypes.bool, 
    isSide: propTypes.bool, 
    articles: propTypes.array,
    isLoop: propTypes.bool,
}