import './TimeStamp.css'

export const TimeStamp = () => {
  const today = new Date();

  // Options to display day, month, and year in Hebrew
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Format the date using the 'he-IL' locale (Hebrew - Israel)
  const formattedDate = today.toLocaleDateString('he-IL', options);

  return <div className="timeStamp">{`${formattedDate}`}</div>
}