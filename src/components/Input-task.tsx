import { IconButton, TextField } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { createTask } from "../util/createTask";

type InputProps = {
  setSize: Dispatch<SetStateAction<boolean>>,
  size: boolean,
}

function InputTask({ setSize, size }: InputProps) {
  const [downArrow, setDownArrow] = useState(false)
  const [taskValue, setTaskValue] = useState<string>("")
  const { id } = useAuth();
  const reSize = function () {
    setSize(!size);
    setDownArrow(!downArrow)
  }

  const sendMessageCallback = useCallback(
    () => {
      createTask(taskValue, "Active", id);
      setTaskValue("")
    },
    [taskValue, id]
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value)
  };

  useEffect(() => {
    function onKeypress(e: KeyboardEvent) {
      if (taskValue && e.code === "Enter") {
        if (e.ctrlKey) {
          setTaskValue(taskValue + "\r\n")
        }
        else {
          e.preventDefault();
          sendMessageCallback()
        }
      }
    }
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);

    };
  });

  return (
    <div className="to-do-list__input">
      <div
        style={{ width: "100%" }}
      >
        <TextField
          placeholder="What need to be done?"
          multiline
          fullWidth
          variant={'standard'}
          value={taskValue}
          maxRows={'3'}
          InputProps={{
            disableUnderline: true
          }}
          style={{
            padding: "5px"
          }}
          onChange={onChange}
        />
      </div>
      <IconButton
        className={`to-do-list__list${downArrow ? "-active" : ''}`}
        onClick={reSize}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </div>
  )
}

export default InputTask
