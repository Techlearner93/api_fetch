import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';

function App() {

  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
    console.log('const searchTerm: ' + searchTerm)
    //console.log('users' + users)
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setUsers(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //users.map(each => console.log(each.name))

  return (
    <div className="App">
      <header className="App-header">
        <p>Who's in the API?</p>
      </header>
      <h2>Data fetched from 'https://jsonplaceholder.typicode.com/users'</h2>

      <input 
        className='Searchbar'
        type='text'
        name='search'
        placeholder='Search...'
        onChange={handleSearchChange}/>

      <div className='App-body'>
        <div>
          {
            users.filter((filteredName) => {
              if (searchTerm === '') {
                return filteredName
              } else if ((filteredName.name).toLowerCase().includes(searchTerm.toLowerCase())) {
                  return filteredName
              }
            }).map((filteredName) => {
              return (
                <li key={filteredName.id}>{filteredName.name}</li>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
