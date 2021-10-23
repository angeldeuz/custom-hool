import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    
    const isMounted = useRef(true);
    const [state, setstate] = useState({data: null, loading: true, error: null})

    // se usa este useEffect solo cuando se inicia el componente y cuando se desmonta (usando el return) ejecutamos la modificacion del isMounted
    // si lo pusiera en el useEffect de abajo, al cambiar la url lo estaria desmontando y cambiando la variable por lo cual ya no se ejecutaria 
    // por que se ejecuta siempre que cambie la url
    useEffect(() => {
        return () => {
            // se genera una misma referencia a la const isMounted
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setstate({data:null, loading:true, error:null});
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                
                if (isMounted.current) {
                    setstate({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
    }, [url])
    

    return state;
}
