import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Task from './Task';
import { useAuth } from '../hooks/use-auth';
import { useDispatch } from "react-redux"
import { setCount } from '../store/slices/userSlice';

type Task = {
  createAt: {
    nanoseconds: number,
    seconds: number
  },
  text: string;
  check: string,
  id: string,
  state: string
}

function useUpdate(id: string) {
  const [newTasks, setNewTasks] = useState<Task[]>([]);
  useEffect(() => {
    const q = query(collection(db, `${id}`), orderBy("createAt"));
    /* eslint-disable */
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      /* eslint-enable */
      const tasks: any = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      setNewTasks(tasks);
    })
  }, [id]);
  return newTasks;
}

function TaskList() {
  const { id, state } = useAuth();
  const tasks = useUpdate(id);
  const dispatch = useDispatch();
  const [tasksList, setTasksList] = useState<Task[]>([]);
  useEffect(() => {
    switch (state) {
      case "All":
        const filteredAllTask: Task[] = [];
        tasks.map((value => value.state !== "Remove" ? filteredAllTask.push(value) : null))
        setTasksList(filteredAllTask)
        break;
      case "Active":
        const filteredActiveTask: Task[] = [];
        tasks.map((value => value.state === "Active" ? filteredActiveTask.push(value) : null))
        setTasksList(filteredActiveTask)
        break;
      case "UnActive":
        const filteredUnActiveTask: Task[] = [];
        tasks.map((value => value.state === "UnActive" ? filteredUnActiveTask.push(value) : null))
        setTasksList(filteredUnActiveTask)
        break;
      default:
        break;
    }
    let ActiveTask: Task[] = []
    tasks.forEach(value => value.state === "Active" ? ActiveTask.push(value) : null)
    dispatch(setCount({
      count: ActiveTask.length
    }))
    let UnActiveTask: Task[] = []
    tasks.forEach(value => value.state === "UnActive" ? UnActiveTask.push(value) : null)
  }, [tasks, state, dispatch])
  return (
    <div className='to-do-list__tasks'>
      {
        tasksList.map((value => <Task key={value.id} idTask={value.id} text={value.text} createAt={value.createAt} check={value.state} />))
      }
    </div>
  )
}

export default TaskList

