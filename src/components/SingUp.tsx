import { useDispatch } from "react-redux"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalError from "./ModalError";
import Loader from "./Loader";
import Form from "./Form";
import { AppRoute } from "../const";
import { setUser } from "../store/slices/userSlice";

type RegisterProps = {
  name: string,
  email: string,
  password: string
};

function addUser(email: string | null, id: string | null,) {
  const newUser = doc(db, 'Users', `${email}`);
  setDoc(newUser, {
    id: id,
    email: email,
  }, { merge: true });
}

function SingUp(): JSX.Element {
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  function handleRegister(data: RegisterProps) {
    setLoading(true)
    const { email, password } = data;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
        }
        ))
        addUser(user.email, user.uid)
        navigate(`${AppRoute.task}`)
        setErrorMessage(null)
      }).catch((error) => {
        setErrorMessage(error);
        setModal(true)
      }).finally(() => {
        setLoading(false)
      })
  }
  if (loading) {
    return (<Loader />)
  }
  return (
    <>
      {
        modal ? <ModalError open={modal} setOpen={setModal} error={errorMessage} /> : null
      }
      <Form title={"Registration"} handleClick={handleRegister} login={false} />

    </>
  )
}

export default SingUp
