import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"

const AppContext = React.createContext()

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {



  const [today, setToday] = useState(new Date())
  const { currentUser } = useAuth()


  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000);
    return () => clearInterval(interval)
  }, []);

  const lWeek = {
    0: [
      { name: 'Игорь', time: '14:00' },
      { name: 'Dkdf', time: '16:00' },
    ],
    1: [
      { name: 'Игорь', time: '14:00' },
      { name: 'Dkdf', time: '16:00' },
    ],
  }

  const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  const [lastWeekDays, setlastWeekDays] = useState({})
  const [nextWeekDays, setNextWeekDays] = useState([])
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

  useEffect( () => {
          fetchStudents()
          fetchNextWeek()
          fetchLastWeek()
  }, [])




  function fetchStudents() {
    let docRef = firestore.collection("users").doc(currentUser.uid)
    docRef.get().then((doc) => {
      if (doc.exists) {
        setStudents([...doc.data().students])
        console.log('есть');
      } else {
        // updateFirestore([...students])
        initialFirestore([...students])
        console.log("No such document!!!!!!!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function fetchLastWeek() {
    let docRef = firestore.collection("users").doc(currentUser.uid)
    docRef.get().then((doc) => {
      if (doc.data().lastWeek) {
        // console.log("есть документ");
        setlastWeekDays(doc.data().lastWeek)
      } else {
        // console.log("документа нет");
        setLastWeek()
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  function fetchNextWeek() {
    let docRef = firestore.collection("users").doc(currentUser.uid)
    docRef.get().then((doc) => {
      if (doc.data().nextWeek) {
        console.log("есть документ");
        setNextWeekDays([...doc.data().nextWeek])
      } else {
        console.log("документа нет");
        let ff = [...doc.data().students.map(student => {
          const s = student
          delete s.balance
          delete s.message
          for (let key in s.day) {
            delete s.day[key].ok
          }
          return s
        })]

        updateNextWeek(ff)
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }



  function createStudent(name, balance) {
    const id = Date.now()
    updateFirestore(
      [...students.concat({
        id: id, name: name, balance: balance, message: '',
        day: {
          0: { time: 'none', ok: false },
          1: { time: 'none', ok: false },
          2: { time: 'none', ok: false },
          3: { time: 'none', ok: false },
          4: { time: 'none', ok: false },
          5: { time: 'none', ok: false },
          6: { time: 'none', ok: false }
        }
      })]
    )
    updateNextWeek(
      [...nextWeekDays.concat({
        id: id, name: name,
        day: {
          0: { time: 'none' },
          1: { time: 'none' },
          2: { time: 'none' },
          3: { time: 'none' },
          4: { time: 'none' },
          5: { time: 'none' },
          6: { time: 'none' }
        }
      })]
    )
  }



  function updateFirestore(params) {
    firestore.collection('users').doc(currentUser.uid).update({
      students: params
    })
    setStudents(params)
  }

  function initialFirestore(students) {
    firestore.collection('users').doc(currentUser.uid).set({
      students: students,
    })
    fetchNextWeek()
    fetchLastWeek()
  }

  function deleteStudent(id) {
    if (window.confirm("Действительно удалить студента?")) {
      updateFirestore([...students.filter(student => student.id !== id)])
      updateNextWeek([...nextWeekDays.filter(student => student.id !== id)])
    }
  }


  function changeLessons(arrow, id) {
    if (arrow === 'up') {
      updateFirestore([...students], [...students.map(student => student.id === id ? student.balance = student.balance + 1 : student.balance)])
    } else if (arrow === 'down') {
      updateFirestore([...students], [...students.map(student => student.id === id ? student.balance = student.balance - 1 : student.balance)])
    }
  }

  function messageReset(student) {
    // student.message = ''
    updateFirestore([...students], [...students.map(s => s === student ? s.message = '' : s.message)])
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
        updateFirestore([...students], [...students.map(student => {
          if (student.id === id) {
            student.day[day].ok = true
          }
        })])
        changeLessons('down', id)
      } else if ((student.id === id && student.day[day].ok === true)) {
        updateFirestore([...students], [...students.map(student => {
          if (student.id === id) {
            student.day[day].ok = false
          }
        })])
        changeLessons('up', id)
      }
    }

    )

  }

  function setLessons(namesStudents, index, LessonNextWeek = 0) {
    let time = 10;
    if (LessonNextWeek === 0) {
      console.log(0)
      namesStudents.forEach(element => {
        updateFirestore([...students], [...students.map(student => student.name === element ? student.day[index].time = `${time++}:00` : student.day[index].time = student.day[index].time)])
      });
    } else {
      console.log(1)
      namesStudents.forEach(element => {
        updateNextWeek([...nextWeekDays], [...nextWeekDays.map(student => student.name === element ? student.day[index].time = `${time++}:00` : student.day[index].time = student.day[index].time)])
      });
    }


  }





  function sendTime(time, man, day, LessonNextWeek = false) {
    const numberDay = +DAYS.indexOf(day)
    if (LessonNextWeek === false) {
      updateFirestore([...students], [students.map(student => {
        if (student.id === man.id) {
          student.day[numberDay].time = time
        }
      })])
    } else {
      updateNextWeek([...nextWeekDays], [nextWeekDays.map(student => {
        if (student.id === man.id) {
          student.day[numberDay].time = time
        }
      })])
    }

  }

  // function updateWeek() {

  //   setLastWeek()


  //   updateFirestore([...students], [...students.map(student => {
  //     Object.entries(student.day).map(data => data[1].ok = false)
  //   })])
  //   updateNextWeek(([...students], [...students.map(student => {
  //       Object.entries(student.day).map(data => data[1].ok = false)
  //     })]))
  // }


  function updateWeek() {
    setLastWeek()

    updateFirestore([...students], [...students.map((student, index) => {
      for (let key in student.day) {
        student.day[key].ok = false
        student.day[key].time = nextWeekDays[index].day[key].time
      }
    })])
  }


  function updateNextWeek(params) {
    firestore.collection('users').doc(currentUser.uid).update({
      nextWeek: params
    })
    setNextWeekDays(params)
  }

  function setLastWeek() {
    let lastWeek = {}
    let a = []

    DAYS.forEach((day, index) => {
      students.map(student => student.day[index].ok &&
        (
          a.push({
            name: student.name,
            time: student.day[index].time
          })
        )
      )
      a.sort((a, b) => a.time > b.time ? 1 : -1);
      lastWeek[index] = a
      a = []
    })
    setlastWeekDays(lastWeek)

    firestore.collection("users").doc(currentUser.uid).update({
      lastWeek: lastWeek
    })
  }

  function leaveMessage(message, id) {
    updateFirestore([...students], [...students.map(student => student.id === id ? student.message = message : null)])
  }

  function deleteWeekLesson(student, index, LessonNextWeek = 0) {
    if (LessonNextWeek === 0) {
      updateFirestore([...students], [...students.map(s => (
        s === student ? (
          s.day[index].time = 'none',
          s.day[index].ok = false
        )
          : s
      ))])
    } else {
      updateNextWeek([...nextWeekDays], [...nextWeekDays.map(s => (
        s === student ? (
          s.day[index].time = 'none'
        )
          : s
      ))])
    }

  }

  function copyPreviousSchedule() {
    updateNextWeek([...nextWeekDays], [...nextWeekDays.map((student, index) => {
      student.name = students[index].name
      student.id = students[index].id
      for (let key in student.day) {
        student.day[key].time = students[index].day[key].time
      }
    })])
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
    leaveMessage,
    messageReset,
    deleteWeekLesson,
    lastWeekDays,
    nextWeekDays,
    copyPreviousSchedule
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
