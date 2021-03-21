import './App.css';
import Login from './Components/Login';
import Feed from './Components/Feed';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Widgets from './Components/Widgets';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue()
  return (
    <div className="App">
      {
        user ? (
          <>
            <Header />

            <div className="app__body">
              <Sidebar />
              <Feed />
            </div>
          </>
        ) : (
            <Login />
          )
      }

    </div>
  );
}
export default App;
