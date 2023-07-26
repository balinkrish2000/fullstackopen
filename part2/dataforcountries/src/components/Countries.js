const Countries = ({countryList}) => {
    return (
      <>
         {countryList.map(country => {
            return (
               <div key={country.cca2}>{country.name.common}</div>
            )
         })}
      </>
    )
}

export default Countries