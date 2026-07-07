import { Link } from "react-router-dom";

const Auth = () => {

  console.log("Redirect");

  return (
    <>
      Auth

      <br />
      <Link to="/about">About</Link>

      <br />

      <Link to="/services">Services</Link>

      <br />

      <Link to="/home">Home</Link>
    </>
  )
}
export default Auth