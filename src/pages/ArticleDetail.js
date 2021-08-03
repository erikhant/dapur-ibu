import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import {v4 as uuidv4} from 'uuid';
import { ArticleList } from '../parts/ArticleList';
import { useHistory, useParams } from 'react-router';
import { ArticleDetailBanner } from '../parts/Banner';
import { UserCircleIcon, CalendarIcon, TagIcon, ChevronLeftIcon, StatusOfflineIcon } from '@heroicons/react/outline';
import { ArticleSkeleton, BannerDetailSkeleton, TextSkeleton } from '../elements/Skeleton';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';

export const ArticleDetail = () => {
    
    // Pick up the url parameters
    const { tag, key } = useParams();
    const { data: article, load: loadArticle, error: errorArticle} = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/article/${tag}/${key}`);
    const { data: otherArticles, load: loadOther, error: errorOtherMess } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/categorys/article/makanan-gaya-hidup', 'GET');
    
    // Responsive Card
    const [deviceScreen, setDeviceScreen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }
        
    }, []);
    

    return(
        <div className="container mx-auto font-body">
            { deviceScreen ? 
                    <div className="flex justify-between items-center w-full bg-gray-50 px-5 py-4 shadow-md mx-auto fixed top-0 z-50">
                        <button onClick={()=>{ history.goBack() }}><ChevronLeftIcon className="h-7 w-7 text-gray-400" /></button>
                        <h1 className="text-sm text-center text-gray-500">{key.split("-").join(" ")}</h1>
                        <div className="w-4 h-4"></div>
                    </div>
                    : ''
            }
            { loadArticle && 
                <div className="h-auto">
                    <BannerDetailSkeleton />
                    <section className="md:flex py-8 mx-5 px-3 md:py-2 md:mx-3">
                        <div className="md:w-4/5 px-3 lg:pl-12 mb-3 md:mb-0"> 
                        {
                            [1,2,3,4,5,6,7,8,9].map(n => (
                                <TextSkeleton key={uuidv4()} />
                            ))
                        }
                        </div>
                        <div className="hidden md:block pl-6 border-l border-gray-300 w-1/3">
                             <div className="h-4 w-2/4 bg-gray-200 rounded"></div>
                            {
                                [1,2,3,4,5,6].map(n => (
                                    <div className="my-4" key={uuidv4()}>
                                        <ArticleSkeleton type="card" horizontal thumbSize="h-28" />
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div> 
            }
            { errorArticle && <div className="flex justify-center items-center w-full h-52 text-xl text-gray-600">{errorArticle}</div> }
            {   article &&
                (
                <>
                <section id="banner" className={deviceScreen ? 'mt-16': ''}>
                    <ArticleDetailBanner 
                        title={article.title} 
                        thumb={article.thumb}
                        author={article.author}
                        date_published={article.date_published}
                        isDeviceScreen={deviceScreen}
                        />
                </section>
                <section className="md:flex py-2 mx-6 md:pb-12 md:pt-10 md:mx-8">
                    <article id="article-description" className="md:w-4/5 px-3 md:px-0 mb-3 md:mb-0 text-justify md:text-left">
                        
                        <p className="text-gray-600 py-7 md:pr-4 lg:px-8 text-sm lg:text-base whitespace-pre-line" style={{lineHeight: 1.7}}>
                            { deviceScreen ? 
                            <>
                                <span className="block md:inline-block text-xs md:text-sm text-gray-400 mr-3">
                                    <UserCircleIcon className="hidden md:inline-block h-5 w-7" /><span className="text-gray-700 font-bold">{article.author}</span>
                                </span>
                                <span className="block md:inline-block text-xs md:text-sm text-gray-400 mr-3">
                                    <CalendarIcon className="hidden md:inline-block h-5 w-7" />{article.date_published}
                                </span>
                                {'\n'}
                            </> : ''
                            }
                            {
                            article.description.split(".").map((word, index)=> {
                                if (index !== 0 && index % 2 === 0) {
                                    return [word, '.', '\n\n'].join('');   
                                }
                                return [word,'. '].join('');  
                            })
                            } 
                        </p>
                    </article>
                    <div className="hidden md:block pl-6 border-l border-gray-300 w-1/3">
                        <div className="mb-3 mt-10">
                            <h1 className="text-gray-800 text-md lg:text-lg font-bold">Artikel Lainnya</h1>
                        </div>
                        { loadOther &&
                            <div className="h-full flex justify-center items-center">
                                loading..
                            </div>
                        }
                        <div className="others">
                        { otherArticles &&
                            <ArticleList articles={otherArticles.slice(0, 7)} tags isSide />
                        }
                        </div>
                    </div>
                </section>
                <section className="py-2 mx-6 mb-5 md:mb-0 md:pb-12 md:pt-10 md:mx-8">
                    <div className="tag-list mb-3 md:mb-8">
                        <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Tag terkait:</h1>
                    </div>
                    <div className="tag-body flex">
                            <span className="bg-gray-100 py-1 px-3 rounded-md">
                                <TagIcon className="inline-block h-5 w-7 text-gray-300" />
                                <span className="text-yellow-400">{tag}</span>
                                {/* <Link to={`/artikel/${tag}`}className="text-yellow-400">{tag}</Link> */}
                            </span>
                    </div>
                </section>
                <section className="py-2 mx-6 mb-5 md:mb-0 md:pb-12 md:pt-10 md:mx-8">
                    <div className="mb-3 md:mb-8">
                        <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Artikel terkait</h1>
                    </div>
                    <div className="related">
                    { errorOtherMess && <div className="flex justify-center items-center w-full h-1/2 text-xl text-gray-600">{errorOtherMess}</div>}
                    {   otherArticles &&
                        <ArticleList isSwipe={!deviceScreen} articles={otherArticles} />
                    }
                    </div>
                </section>
                </>
                )
                
            }
            {   errorArticle &&
                <Modal>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-300 inline-block" />
                        <p className="text-gray-400 tracking-wide capitalize mb-2">{errorArticle}</p>
                        <Button onClick={()=> window.location.reload()} Rounded Secondary Bordered className="px-8 py-2 my-4">
                            Refresh
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    );
}
