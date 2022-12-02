import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
//import {getSpaces}  from '../apis/twitterAPI' 

import { useDispatch, useSelector } from 'react-redux'
import { getSpaces, twitterSelector,clearState } from "../features/twitter/twitterSlice";

export const SearchSpaces = () => {

    const dispatch = useDispatch();
    const { isLoading, isError,errMessage,isSuccess,spaces } = useSelector(twitterSelector)
    const [queryText,setQuertText] = useState(" NFT ");

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        const filter = {query:queryText, state:'all'}
        dispatch(getSpaces(filter));

    }

    useEffect(()=>{
    //  const data =   getSpaces(" NFT ","live");
       
    // console.log(data);
      
    },[]
    )

    return (
        <div className="search-main">
                                 <form onSubmit={handleSubmit}>             
                                    <input type="text" className="form-control" 
                                    value={queryText}
                                    id="search" onChange={(e)=>setQuertText(e.target.value)}
                                           placeholder="Search for NFT related Twitter Spaces">
                                    </input>
                                    <button type="submit" className="btn btn-search">

                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                </form> 
         </div>
    )
}