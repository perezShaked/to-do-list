import './components_style/TimeStemp.css'

export const TimeStemp = () => {
  const today = new Date();
  
  const getTodayDayOfTheWeek = () => {
    const daysOfTheWeek = new Map<number, string>([
      [0, 'א'],
      [1, 'ב'],
      [2, 'ג'],
      [3, 'ד'],
      [4, 'ה'],
      [5, 'ו'],
      [6, 'ש'],
    ]);

    return daysOfTheWeek.get(today.getDay());
  }

  const getTodayDate = () => {
    const year = today.getFullYear();
    const dayOfTHeMonth = today.getDate();
    const monthes = new Map<number, string>([
      [0, 'ינואר'],
      [1, 'פברואר'],
      [2, 'מרץ'],
      [3, 'אפריל'],
      [4, 'מאי'],
      [5, 'יוני'],
      [6, 'יולי'],
      [7, 'אוגוסט'],
      [8, 'ספומבר'],
      [9, 'אוקטובר'],
      [10, 'נובמבר'],
      [11, 'דצמבר'],
    ]);

    return `${dayOfTHeMonth} ב${monthes.get(today.getMonth())} ${year}`;
  }
  return <div className="timeStemp">{`יום ${getTodayDayOfTheWeek()}, ${getTodayDate()}`}</div>
}