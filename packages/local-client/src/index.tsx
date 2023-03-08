import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/cell-list';
import Banner from './components/banner';

const App = () => {


  return ( 
    <Provider store={store}>
      <div>
        <Banner />
        <CellList />
      </div>
    </Provider>
  );
};


ReactDOM.render(
  
  <App />,
  document.querySelector('#root')
);