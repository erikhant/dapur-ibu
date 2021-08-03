import React, {useState, useEffect} from 'react'
import useFetch from '../hooks/useFetch';
import { SearchInput } from '../elements/SearchInput';
import { RecipeList } from '../parts/RecipeList';
import { HomeBanner } from '../parts/Banner';
import { ArticleList } from '../parts/ArticleList';
import { SearchIcon, StatusOfflineIcon } from '@heroicons/react/outline';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';
import { CardSkeleton } from '../elements/Skeleton';

export const Homepage = () => {
   
    const [deviceScreen, setDeviceScreen] = useState(false);

    const {data:recipesA, load: loadRecipesA, error: errorRecipesA } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/recipes-length/?limit=10', 'GET');
    const {data:recipesB, load: loadRecipesB, error: errorRecipesB } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/recipes', 'GET');
    const {data:recipesC, load: loadRecipesC, error: errorRecipesC } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/recipes/1', 'GET');
    const {data:articles, load: loadArticles, error: errorArticles } = useFetch('https://masak-apa-tomorisakura.vercel.app/api/categorys/article/inspirasi-dapur', 'GET');

    useEffect(() => {
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }    
        
    }, []);

 
    return(
        <div className="container mx-auto font-body">
            { deviceScreen ? 
                <div className="flex items-center w-full bg-gray-50 px-5 py-3 shadow-md mx-auto sticky top-0 z-50">
                    <SearchIcon className="h-7 w-7 text-gray-400" /> 
                    <SearchInput isRounded isWide placeholder="Cari Masakan Favoritmu.." className="h-8" />
                </div>
                : ''
            }
            <section id="banner" className="relative h-screen">
                <HomeBanner isDeviceScreen={deviceScreen} />
            </section>
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-28 font-body">
                <div className="mb-3 md:mb-8">
                    <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Rekomendasi untukmu</h1>
                </div>
                { errorRecipesA &&  <div className="flex justify-center items-center w-full h-52 text-lg text-gray-600">{ errorRecipesA }</div>}
                { loadRecipesA &&  <CardSkeleton isMobileScreen={deviceScreen} />  }
                { recipesA && <RecipeList isDeviceScreen={deviceScreen} recipes={recipesA} /> }
            </section>
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-12 font-body">
                <div className="mb-3 md:mb-8">
                    <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Terbaru</h1>
                </div>
                { errorRecipesB && <div className="flex justify-center items-center w-full h-52 text-lg text-gray-600">{ errorRecipesB }</div>}
                { loadRecipesB && <CardSkeleton isMobileScreen={deviceScreen} /> }
                { recipesB && <RecipeList isDeviceScreen={deviceScreen} recipes={recipesB} /> }
            </section>
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-12 font-body">
                <div className="mb-3 md:mb-8">
                    <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Terpopuler</h1>
                </div>
                { errorRecipesC &&  <div className="flex justify-center items-center w-full h-52 text-lg text-gray-600">{ errorRecipesC }</div>}
                { loadRecipesC && <CardSkeleton isMobileScreen={deviceScreen} /> }
                { recipesC && <RecipeList isDeviceScreen={deviceScreen} recipes={recipesC} /> }
            </section>
            <section className="py-2 px-6 mt-6 md:p-8 md:pt-18 md:mt-12 font-body">
                <div className="mb-3 md:mb-8">
                    <h1 className="text-md md:text-2xl text-gray-700 font-semibold">Artikel</h1>
                </div>
                <div className="articles">
                { loadArticles && <CardSkeleton isMobileScreen={!deviceScreen} horizontal /> }
                { errorArticles && <div className="flex justify-center items-center w-full h-36 text-xl text-gray-600">{errorArticles}</div>}
                {  articles &&  
                    <ArticleList isSwipe={!deviceScreen} articles={articles} tags={true} />
                    
                }
                </div>
            </section>
            {   errorRecipesA &&
                <Modal>
                    <div className="w-full h-full flex flex-col justify-center items-center font-body">
                        <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-400 inline-block" />
                        <p className="text-secondary-dark tracking-wide capitalize mb-2">{errorRecipesA}</p>
                        <Button onClick={()=> window.location.reload()} Rounded Bordered className="px-8 py-2 my-4 tracking-wider font-thin">
                            Refresh
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    );
}
