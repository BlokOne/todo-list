import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/use-auth";
import { setState } from "../store/slices/userSlice";
import { removeTasks } from "../util/deleteCompleted";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from "@mui/material";



function Footer() {
  const { state, count } = useAuth();
  const [border, setBorder] = useState([0, 1, 0]);

  useEffect(() => {
    switch (state) {
      case "All":
        setBorder([1, 0, 0])
        break;
      case "Active":
        setBorder([0, 1, 0])
        break;
      case "UnActive":
        setBorder([0, 0, 1])
        break;
    }

  }, [state])
  const dispatch = useDispatch();
  const changeFilter = function (state: string) {
    dispatch(setState({
      state: state
    }))
  }
  return (
    <div
      className="to-do-list__footer"
    >
      <div
        className="to-do-list__footer-count">
        {
          count > 1 ? `${count} items left` : `${count} item left`
        }
      </div>
      <div
        className="to-do-list__footer-buttons">
        <button className={`to-do-list__footer-button ${border[0] ? "active" : ""}`} onClick={() => changeFilter("All")}>All</button>
        <button className={`to-do-list__footer-button ${border[1] ? "active" : ""}`} onClick={() => changeFilter("Active")}> Active</button>
        <button className={`to-do-list__footer-button ${border[2] ? "active" : ""}`} onClick={() => changeFilter("UnActive")}> Completed</button>
      </div >
      <div
        className="to-do-list__footer-button-delete">
        <IconButton
          onClick={removeTasks}
        >
          <DeleteForeverIcon />
        </IconButton>
      </div>
    </div >
  )
}

export default Footer
