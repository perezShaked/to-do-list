import './components_style/SortButton.css'
import {ArrowIcon} from './elements/ArrowIcon'

export const SortButton = () => {
  return(
    <button className="sortButton">כל הסטטוסים<ArrowIcon className='sortButtonArrow' direction='down'/></button>
  )
}