import React from "react"
import {useSearchParams} from 'react-router-dom'

export default function Update(){
    const useCustomSearchParams = () => {
        const [search, setSearch] = useSearchParams();
        const searchAsObject = Object.fromEntries(
          new URLSearchParams(search)
        );
      
        return [searchAsObject, setSearch];
    };

    const [search, setSearch] = useCustomSearchParams()
    return(
        <div>{search.q}</div>
    )
}