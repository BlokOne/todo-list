
import { Grid, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AppRoute } from "../const";


interface FormProps {
  title: string,
  handleClick: any,
  login: boolean,

}
function Form({ title, handleClick, login, }: FormProps): JSX.Element {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur"
  })
  return (
    <>

      <div>
        <Grid container
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
          rowGap={"10%"}
        >
          <form onSubmit={handleSubmit(handleClick)}
            style={{
              width: "216px",
              display: "flex",
              flexDirection: "column",
            }}>
            {
              login ? null
                :
                <>
                  <TextField
                    {...register("Name", {
                      required: "Required",
                    })
                    }
                    label="Name"
                    variant="standard" />
                  <div
                    style={{ height: "30px", paddingTop: "5px", color: "red" }}
                  >
                    {errors?.Name && <p>
                      {errors?.Name?.message || "Error"}
                    </p>}
                  </div>
                </>
            }
            <TextField
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })
              }
              label="Email"
              variant="standard" />
            <div
              style={{ height: "30px", paddingTop: "5px", color: "red" }}
            >
              {errors?.email && <p>
                {errors?.email?.message || "Error"}
              </p>}
            </div>
            <TextField
              {...register("password", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 symbols "
                }
              })
              }
              type="password"
              label="Password"
              variant="standard" />
            <div
              style={{ height: "30px", paddingTop: "5px", color: "red" }}
            >
              {errors?.password && <p>
                {errors?.password?.message || "Error"}
              </p>}
            </div>

            <Input
              className="to-do-list__submit-form"
              type="submit"
              value={title}
              disableUnderline={true}
              disabled={!isValid}
            />
          </form>
        </Grid>
        {
          login ? <p className="to-do-list__login-link">
            No account?   <br />
            <Link to={AppRoute.registration}>Create it!</Link>
          </p>
            : <p className="to-do-list__login-link">
              Already have an account? <br />
              <Link to={AppRoute.login}>Sign in</Link>
            </p>
        }
      </div >
    </>

  )
}

export default Form
