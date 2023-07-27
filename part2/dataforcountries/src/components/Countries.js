const Countries = ({countryList, onClickingShow}) => {
    return (
      <>
         {countryList.map(country => {
            return (
               <div key={country.cca2}>
                  {country.name.common}
                  <button value={country.name.common}
                     onClick={onClickingShow}>
                     show
                  </button>
               </div>
            )
         })}
      </>
    )
}

export default Countries