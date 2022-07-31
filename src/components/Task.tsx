import { useCallback } from "react"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import IconButton from '@mui/material/IconButton';
import { changeStatus } from "../util/changeState";
import { useAuth } from "../hooks/use-auth";

type TaskProps = {
  createAt: {
    nanoseconds: number,
    seconds: number
  },
  idTask: string,
  text: string;
  check: string
}

function Task({ createAt, idTask, text, check }: TaskProps) {
  const { id } = useAuth();
  const Change = useCallback(
    () => {
      changeStatus({ createAt, idTask, text, check, id })
    },
    [createAt, idTask, text, check, id]
  )
  return (
    <>
      <article
        className="to-do-list__task"
      >
        <IconButton
          style={{
            width: "30px",
            boxSizing: "border-box"
          }}
          onClick={Change}
        >
          {
            check === "Active" ?
              <RadioButtonUncheckedIcon
                style={{ color: "black" }} /> :
              <TaskAltIcon
                style={{ color: "black" }}
              />
          }
        </IconButton>

        <p>
          {text}
        </p>
      </article>
    </>
  )
}

export default Task
