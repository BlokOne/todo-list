import { Grid } from "@mui/material"
import { Container } from "@mui/system"


function Loader() {
  return (
    <Container>
      <Grid container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"centre"}
        >
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader
