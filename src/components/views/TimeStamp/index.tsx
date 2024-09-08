import './TimeStamp.css'

export const TimeStamp = () => {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = today.toLocaleDateString('he-IL', options);

  return <div className="timeStamp">{`${formattedDate}`}</div>
}