import './components_style/SortButton.css'
import {ArrowIcon} from './ArrowIcon'

export default function SortButton(){
  return(
    <button id="sortButton">כל הסטטוסים<ArrowIcon usedBy='sortButtonArrow' direction='down'/></button>
  )
}