import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch';
import { SearchInput } from '../elements/SearchInput';
import { useParams } from 'react-router'
import { RecipeList } from '../parts/RecipeList'
import { SearchIcon } from '@heroicons/react/outline';
import { Button } from '../elements/Button';
import { Modal } from '../elements/Modal';
import { StatusOfflineIcon } from '@heroicons/react/outline';
import { CardSkeleton } from '../elements/Skeleton';

export const View = () => {

    const [deviceScreen, setDeviceScreen] = useState(false);
    const { key, que } = useParams();
    // const { que } = useParams();
    let URL;

    if (que) URL = `search/?q=${encodeURIComponent(que.split("-").join(" "))}`;
    if (key) URL = `categorys/recipes/${key}`;

    const {data: result, load:loadResult, error:errorResult} = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/${URL}`, 'GET');
    const {data: otherResult, error:errorOtherResult} = useFetch(`https://masak-apa-tomorisakura.vercel.app/api/recipes`, 'GET');

    useEffect(() => { 
        if (window.screen.width < 728) {
            setDeviceScreen(true);
        }    
    }, []);


    return(
        <div className="container mx-auto font-body">
            { deviceScreen ? 
                <div className="flex items-center w-full bg-gray-50 px-5 py-4 shadow-md mx-auto fixed top-0 z-50">
                    <SearchIcon className="h-7 w-7 text-gray-400" /> 
                    <SearchInput isRounded isWide placeholder="Cari Masakan Favoritmu.." className="h-8" />
                </div>
                : ''
            }
            <section className={`${deviceScreen ? 'py-2 px-6 mt-16' : 'p-8 pt-18 mt-12' } font-body`}>
                <div className="mb-3 mt-4 md:mb-8">
                    { que &&  <span className="text-gray-400 text-base mb-3 inline-block">Hasil yang Anda cari :</span>}
                    <h1 className="text-lg md:text-2xl text-gray-700 font-semibold capitalize"> { key ? key.split("-").join(" ") : que.split("-").join(" ") } </h1>
                </div>
                { loadResult && 
                    <CardSkeleton />
                }
                { errorResult && <div className="flex justify-center items-center w-full h-52 text-xl text-gray-600"><p className="text-gray-500 text-sm md:text-base">{errorResult}</p></div> }
                {   result &&
                    <div className="result">
                        <RecipeList recipes={result} />
                    </div>
                }
            </section>
            {  result &&
                <section className="py-2 px-6 mt-6 md:p-8 md:mt-12 font-body">
                    <div className="mb-3 mt-4 md:mb-8">
                        <h1 className="text-md md:text-2xl text-gray-700 font-semibold"> { que ? 'Resep Lainnya' : 'Kamu mungkin juga suka' } </h1>
                    </div>
                    { errorOtherResult && <div className="flex justify-center items-center w-full h-52 text-xl text-gray-600">{errorOtherResult}</div> }
                    <RecipeList recipes={otherResult} isDeviceScreen={deviceScreen} />
                </section>
            }
             {   errorResult &&
                <Modal>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <StatusOfflineIcon className="w-40 h-40 mb-8 text-gray-300 inline-block" />
                        <p className="text-gray-400 tracking-wide capitalize mb-2">{errorResult}</p>
                        <Button onClick={()=> window.location.reload()} Rounded Secondary Bordered className="px-8 py-2 my-4">
                            Refresh
                        </Button>
                    </div>
                </Modal>
            }
        </div>
    );
}
