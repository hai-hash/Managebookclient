import Body from "./components/Body";
import Header from './components/Menu/Header';
import { BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="hidden-sn animated deep-purple-skin">
        <div>
          <Header/>
          <Body/>
        
      </div>
    </div>

    </Router>
    
  )
}

export default App;
