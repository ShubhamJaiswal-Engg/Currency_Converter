import data from "./countrycode.json"

const Flag = ({from}) => {
  let countrycode = data[from]
  return (
    <img type="click" className='h-11 text-center mt-1' src={`https://flagsapi.com/${countrycode}/flat/64.png`}/>
  )
}

export default Flag;
