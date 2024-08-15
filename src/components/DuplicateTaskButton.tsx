export default function DuplicateTaskButton(){
  return(
    <>
      <div id="duplicateContainer" className="greyRoundContainer">
        <button id="duplicateButton" className="greyRoundButton"></button>
        <DuplicateTaskIcon/>
      </div>
    </>
  )
}


function DuplicateTaskIcon(){
  return(
    <svg className="greyRoundButtonIcon"xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 3.61929 3.61929 2.5 5 2.5H11.6667C13.0474 2.5 14.1667 3.61929 14.1667 5V5.83333H15C16.3807 5.83333 17.5 6.95262 17.5 8.33333V15C17.5 16.3807 16.3807 17.5 15 17.5H8.33333C6.95262 17.5 5.83333 16.3807 5.83333 15V14.1667H5C3.61929 14.1667 2.5 13.0474 2.5 11.6667V5ZM7.5 15C7.5 15.4602 7.8731 15.8333 8.33333 15.8333H15C15.4602 15.8333 15.8333 15.4602 15.8333 15V8.33333C15.8333 7.8731 15.4602 7.5 15 7.5H8.33333C7.8731 7.5 7.5 7.8731 7.5 8.33333V15ZM12.5 5.83333H8.33333C6.95262 5.83333 5.83333 6.95262 5.83333 8.33333V12.5H5C4.53976 12.5 4.16667 12.1269 4.16667 11.6667V5C4.16667 4.53976 4.53976 4.16667 5 4.16667H11.6667C12.1269 4.16667 12.5 4.53976 12.5 5V5.83333Z" fill="white"/>
    </svg>
  )
}