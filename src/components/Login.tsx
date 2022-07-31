import { useDispatch } from "react-redux"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../util/getUserInfo";
import { AppRoute } from "../const";
import ModalError from "./ModalError";
import Form from "./Form";
import Loader from "./Loader";
import { setUser } from "../store/slices/userSlice";


type RegisterProps = {
  firstName: string;
  secondName: string;
  email: string;
  password: string
};

function Login(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    getAuth().onAuthStateChanged(function (user) {
      if (user) {
        getUserInfo(user).then((): void => {
          dispatch(setUser({
            email: user.email,
            id: user.uid,
          }))
          navigate(`${AppRoute.task}`)
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    });
  }, [dispatch, navigate])

  function handleLogin(data: RegisterProps): void {
    setLoading(true)
    const { email, password } = data;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        getUserInfo(user).then((): void => {
          dispatch(setUser({
            email: user.email,
            id: user.uid
          }))
          navigate(`${AppRoute.task}`)
          setErrorMessage(null)
        })
      })
      .catch((error) => {
        setErrorMessage(error);
        setModal(true)
      }).finally(() => {
        setLoading(false)
      })
  }
  if (!loading) {
    return (
      <>
        {
          modal ? <ModalError open={modal} setOpen={setModal} error={errorMessage} /> : null
        }
        <Form title={"Sign in"} handleClick={handleLogin} login={true} />

      </>
    )
  }
  return (<Loader />)

}

export default Login