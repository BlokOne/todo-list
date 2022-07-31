import { Navigate, Route, Routes } from "react-router-dom";
import { AppRoute } from './const';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import TaskPage from './pages/TaskPage';

function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path={AppRoute.login} element={<LoginPage />} />
        <Route path={AppRoute.registration} element={<RegistrationPage />} />
        <Route path={AppRoute.task} element={<TaskPage />} />
        <Route path="*" element={<Navigate to={AppRoute.task} replace />} />
      </Routes>
    </>
  );
}

export default App;
