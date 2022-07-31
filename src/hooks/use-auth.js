import { useSelector } from "react-redux";

export function useAuth() {
  const { email, id, state, count } = useSelector(state => state.user)

  return {
    isAuth: !!email,
    email,
    id,
    state,
    count
  }
}