import './SearchBar.css'

type searchBarProps = {
  value: string,
  onChange: (value: string) => void
}

export const SearchBar = ({value, onChange}: searchBarProps) => {
  return(
      <div className='searchBarContainer'>
        <SearchIcon />
        <input 
          type='text' 
          className='searchBarInput' 
          value={value} 
          placeholder='חיפוש' 
          onChange={(element) => onChange(element.target.value)}/>
      </div>
  )
}

const SearchIcon = () => {
  return (
    <svg className="searchIcon" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66665 3.16668C4.45751 3.16668 2.66665 4.95754 2.66665 7.16668C2.66665 9.37582 4.45751 11.1667 6.66665 11.1667C8.87579 11.1667 10.6666 9.37582 10.6666 7.16668C10.6666 4.95754 8.87579 3.16668 6.66665 3.16668ZM1.33331 7.16668C1.33331 4.22116 3.72113 1.83334 6.66665 1.83334C9.61217 1.83334 12 4.22116 12 7.16668C12 8.39915 11.5819 9.53398 10.8799 10.4371L14.4714 14.0286C14.7317 14.289 14.7317 14.7111 14.4714 14.9714C14.211 15.2318 13.7889 15.2318 13.5286 14.9714L9.93708 11.3799C9.03395 12.082 7.89912 12.5 6.66665 12.5C3.72113 12.5 1.33331 10.1122 1.33331 7.16668Z"/>
    </svg>
  )
}