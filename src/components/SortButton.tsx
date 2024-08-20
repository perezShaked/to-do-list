import './components_style/SortButton.css'
import ArrowButton from './ArrowButton'

export default function SortButton(){
  return(
    <>
      <div id="sortContainer">
        <button id="sortButton">כל הסטטוסים</button>
        <ArrowButton usedBy='sortDownArrow' direction='down'/>
      </div>
    </>
  )
}