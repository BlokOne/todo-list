import { Dispatch, SetStateAction } from "react"
import { useAuth } from "../hooks/use-auth";
import InputTask from "./Input-task"
import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { removeUser } from "../store/slices/userSlice";

type HeaderProps = {
  setSize: Dispatch<SetStateAction<boolean>>,
  size: boolean,
}

function Header({ setSize, size }: HeaderProps) {
  const dispatch = useDispatch()
  function exit() {
    getAuth().signOut().then(function () {
      dispatch(removeUser());
    }, function (error) {
      console.error('Sign Out Error', error);
    });


  }
  const { email } = useAuth();
  return (
    <div className="to-do-list__header">
      <div className="to-do-list__header-info">
        <p className="to-do-list__title">
          Task list by {email}
        </p>
        <IconButton
          onClick={exit}
        >
          <LogoutIcon />
        </IconButton>
      </div>
      <InputTask setSize={setSize} size={size} />
    </div>
  )
}

export default Header
