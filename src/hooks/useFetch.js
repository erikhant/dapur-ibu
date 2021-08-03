import { useState, useEffect } from 'react'

const useFetch = (url, method) => {

    const [data, setData] = useState(null);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);

    const abortControl = new AbortController();

    useEffect(() => {

        setLoad(true);
        setData(null);
        setError(null);

        fetch(url, {
            method: method,
            signal: abortControl.signal
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Oops! sepertinya ada yang tidak beres. Silahkan coba lagi nanti atau refresh halaman!')
            }
            return response.json();
        })
        .then(data => {
            if (data.results.length === 0) {
                throw new Error('No result')
            }
            // console.log(data.results);
            setData(data.results);
            setLoad(false);
        })
        .catch(error => {
            setLoad(false);
            //  Error Abort controller
            if (error.name === 'AbortError') return;
            //  No network connection error
            else if (error.message === "Failed to fetch") {
                setError("Gagal memuat data");
            }
            // auto catches network/API request error
            else {
                setError(error.message);
            }
        })

        // return abort function
        return () => abortControl.abort();

    }, [url])

    return { data, load, error };
}

export default useFetch;