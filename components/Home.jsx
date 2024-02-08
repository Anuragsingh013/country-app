import { useState } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import SelectMenu from './SelectMenu'
import CountriesList from './CountriesList'

const Home = () => {

  //1.initally the value of query is " empty string" which is present in all string so in filter
  // method all country will filtered and hme sari country show hogi countrieList me
  const [query, setQuery] = useState('')
  return (
    <>
      <main>
        <div className="search-filter-container">

          {/*2. but when user update query value in SearchBar */}
          <SearchBar setQuery={setQuery} />
          <SelectMenu  setQuery={setQuery}/>
        </div>

        {/*3. after filtering value now our card will show here  */}
        { <CountriesList query={query} />}
      </main>
    </>
  )
}

export default Home