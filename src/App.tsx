import { setUsers } from '@store';
import { UserTable } from '@components';
import { useEffect, useDispatch, axios } from '@utils';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      dispatch(setUsers(response.data));
    });
  }, []);

  return (
    <div className='App'>
      <UserTable />
    </div>
  );
}

export default App;
