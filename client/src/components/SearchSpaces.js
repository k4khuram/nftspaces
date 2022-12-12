import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { userSelector } from "../features/user/userSlice"

import { useDispatch, useSelector } from 'react-redux'
import { getSpaces, twitterSelector, clearState } from "../features/twitter/twitterSlice";

export const SearchSpaces = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(userSelector);
    const { isLoading, isError, errMessage, isSuccess, spaces } = useSelector(twitterSelector)
    const [queryText, setQuertText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(userInfo.id);
        const filter = { query: queryText, state: 'all', userId: userInfo.id }
        dispatch(getSpaces(filter));
    }

    return (
        <div className="search-main">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control"
                    value={queryText}
                    id="search" onChange={(e) => setQuertText(e.target.value)}
                    placeholder="Search for NFT related Twitter Spaces">
                </input>
                <button type="submit" className="btn btn-search">

                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
}