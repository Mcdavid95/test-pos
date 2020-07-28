// eslint-disable-next-line
const styles = theme => ({
  root: {
    background: "#efefef",
    height: "100vh"
  },
  paper: {
    minWidth: 300,
    display: "flex",
    flexDirection: "column",
    width: "350px",
    minHeight: "230px",
    margin: "auto",
    alignItems: "center",
    padding: "20px 30px 30px 30px"
  },
  loginContainer: {
    display: "flex",
    height: "calc(10vh)",
    flexDirection: "column",
  },
  errorMessage: {
    width: "90%",
    marginTop: 20
  },
  wrapper: {
    marginTop: 20,
    position: "relative"
  },
  avatarContainer: {
    minWidth: 300,
    display: "grid",
    flexDirection: "column",
    width: "350px",
    minHeight: "230px",
    margin: "auto",
    alignContent: "center",
    justifyItems: "center",
    padding: "20px 30px 30px 30px"
  },
  large: {
    width: 150,
    height: 150,
  },
  buttonProgress: {
    color: "black",
    position: "absolute",
    top: "50%",
    left: "40px",
    marginTop: -12,
    marginLeft: -12
  }
});

export default styles;
