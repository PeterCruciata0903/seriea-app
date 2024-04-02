import React, {useState, useEffect} from 'react';
import api from './api';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    position: '',
    nationality: '',
    team: '',
    value: ''
  });

  const fetchPlayers = async () => {
    try {
      const response = await api.get('/players/');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      // Handle error, e.g., show a notification to the user
    }
  };
  

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/players/', formData);
    fetchPlayers();
    setFormData({
      name: '',
      age: '',
      position: '',
      nationality: '',
      team: '',
      value: ''
    })
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Serie A Transmarket Value</a>
        </div>
      </nav>

      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Nationality</th>
            <th>Team</th>
            <th>Value</th> 
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.age}</td>
              <td>{player.position}</td>
              <td>{player.nationality}</td>
              <td>{player.team}</td>
              <td>{player.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )

};
export default App;
