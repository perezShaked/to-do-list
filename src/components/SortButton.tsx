export default function SortButton(){

  return(
    <>
      <div id="sortContainer">
        <button id="sortButton">כל הסטטוסים</button>
        <DownArrow/>
      </div>
      
    </>
    
  )
}


function DownArrow(){
  return(
    <svg className='downArrow' xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M11.1519 16.0396L12.0003 16.888L18.7887 10.0996L17.0919 8.40283L12.0003 13.4932L6.90871 8.40283L5.21191 10.0996L11.1519 16.0396Z" fill="#075C93"/>
</svg>
  )
}