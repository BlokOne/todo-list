import { Box, Modal, Typography, Button } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { errorAlert } from "../util/errorAlert";


interface ModalErrorProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  error: string | null;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function ModalError({ open, setOpen, error }: ModalErrorProps) {
  const [message, setMessage] = useState<string>()
  let errorName: string = ""
  if (error) {
    errorName = error.toString()
    errorName = errorName.split("(")[1].split(")")[0].split('/')[1]
  }

  useEffect(() => {
    setMessage(errorAlert(errorName))
  }, [errorName])

  function handelClose() {
    setOpen(false)
  };

  return (
    <Modal
      open={open}
      onClose={handelClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description" >
      <Box
        sx={style}>
        <Button
          style={{ position: "absolute", right: "15px", top: "15px" }}
          onClick={handelClose}
        >
          <CloseIcon />
        </Button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          There's been a mistake.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    </Modal>

  )
}

export default ModalError
