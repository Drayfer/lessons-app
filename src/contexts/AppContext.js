import React, { useContext, useState, useEffect } from "react"


const AppContext = React.createContext()

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {

  const [today, setToday] = useState(new Date())


  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000);
    return () => clearInterval(interval)
  }, [setToday]);

  const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  const [students, setStudents] = useState([
    {
      id: 1, name: 'Роман', balance: 3, message: 'Пример сообщения, как напоминания о том, какую информацию можно оставить о студенте, чтобы не забыть',
      day: {
        0: { time: '14:00', ok: false },
        1: { time: '08:00', ok: false },
        2: { time: 'none', ok: false },
        3: { time: 'none', ok: false },
        4: { time: 'none', ok: false },
        5: { time: 'none', ok: false },
        6: { time: 'none', ok: false }
      }
    },
    {
      id: 2, name: 'Игорь', balance: -3, message: '',
      day: {
        0: { time: 'none', ok: false },
        1: { time: '11:00', ok: false },
        2: { time: 'none', ok: false },
        3: { time: '12:00', ok: false },
        4: { time: 'none', ok: false },
        5: { time: 'none', ok: false },
        6: { time: '09:00', ok: false }
      }
    },
    {
      id: 3, name: 'Виктор', balance: 4, message: '',
      day: {
        0: { time: 'none', ok: false },
        1: { time: '13:00', ok: false },
        2: { time: 'none', ok: false },
        3: { time: '10:00', ok: false },
        4: { time: 'none', ok: false },
        5: { time: 'none', ok: false },
        6: { time: 'none', ok: false }
      }
    },
  ])


  function createStudent(name, balance) {
    setStudents([...students.concat({
      id: Date.now(), name: name, balance: balance, message: '',
      day: {
        0: { time: 'none', ok: false },
        1: { time: 'none', ok: false },
        2: { time: 'none', ok: false },
        3: { time: 'none', ok: false },
        4: { time: 'none', ok: false },
        5: { time: 'none', ok: false },
        6: { time: 'none', ok: false }
      }
    })])
  }

  function deleteStudent(id) {
    window.confirm("Действительно удалить студента?") && setStudents([...students.filter(student => student.id !== id)])
  }

  function changeLessons(arrow, id) {
    if (arrow === 'up') {
      setStudents([...students], [...students.map(student => student.id === id ? student.balance = student.balance + 1 : student.balance)])
    } else if (arrow === 'down') {
      setStudents([...students], [...students.map(student => student.id === id ? student.balance = student.balance - 1 : student.balance)])
    }
  }

  function getTodayLogo() {
    let todayDay = ''
    let getTimeString = function (input, separator) {
      let pad = function (input) { return input < 10 ? "0" + input : input; };
      let date = input ? new Date(input) : new Date();
      return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
      ].join(typeof separator !== 'undefined' ? separator : ':');
    }

    return `Сегодня: ${DAYS[today.getDay() - 1] === undefined ? todayDay = DAYS[6] : todayDay = DAYS[today.getDay() - 1]} /
     ${String(today.getDate()).padStart(2, '0')} ${MONTHS[today.getMonth()]} /
    ${getTimeString()}
    `
  }

  function checkLesson(id, day) {

    students.map(student => {
      if (student.id === id && student.day[day].ok === false) {
        setStudents([...students], [...students.map(student => {
          if (student.id === id) {
            student.day[day].ok = true
          }
        })])
        changeLessons('down', id)
      } else if ((student.id === id && student.day[day].ok === true)) {
        setStudents([...students], [...students.map(student => {
          if (student.id === id) {
            student.day[day].ok = false
          }
        })])
        changeLessons('up', id)
      }
    }

    )

  }

  function setLessons(namesStudents, index) {
    let time = 10;
    namesStudents.forEach(element => {
      setStudents([...students], [...students.map(student => student.name === element ? student.day[index].time = `${time++}:00` : student.day[index].time = student.day[index].time)])
    });
  }




  function sendTime(time, man, day) {
    const numberDay = +DAYS.indexOf(day)

    setStudents([...students], [students.map(student => {
      if (student.id === man.id) {
        student.day[numberDay].time = time
      }
    })])
  }

  function updateWeek() {
    setStudents([...students], [...students.map(student => {
      Object.entries(student.day).map(data => data[1].ok = false)
    })])
  }

  function leaveMessage(message, id) {

    setStudents([...students], [...students.map(student => student.id === id ? student.message = message : null)])
  }

  const value = {
    getTodayLogo,
    students,
    deleteStudent,
    changeLessons, 
    createStudent,
    updateWeek,
    DAYS,
    checkLesson,
    setLessons,
    sendTime,
    leaveMessage    
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
