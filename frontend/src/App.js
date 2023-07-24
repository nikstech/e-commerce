import Routers from "./routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUserAction } from "./redux/slices/AuthSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(authUserAction(JSON.parse(localStorage.getItem("jwt"))));
    }
  }, [dispatch]);
  return <Routers />;
}

export default App;
