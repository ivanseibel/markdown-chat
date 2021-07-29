import { BrowserRouter as Router } from 'react-router-dom';

import { RoomProvider } from './context';
import Routes from './routes';

const App = () => {
  return (
    <Router>
      <RoomProvider>
        <Routes />
      </RoomProvider>
    </Router>
  );
};

export default App;
