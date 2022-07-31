import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TaskList from '../components/task-list';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from "react-router-dom"
import { AppRoute } from '../const';



function TaskPage() {
  const { isAuth } = useAuth();
  const [sizeBig, setSizeBig] = useState(true);
  if (!isAuth) {
    return (
      <Navigate replace to={AppRoute.login} />
    )
  }
  return (
    <div className={`to-do-list ${sizeBig ? "active" : ""}`}>
      <Header setSize={setSizeBig} size={sizeBig} />
      <TaskList />
      <Footer />
    </div>
  )
}

export default TaskPage
