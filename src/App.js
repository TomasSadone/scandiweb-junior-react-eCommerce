// import React, { useEffect, useState } from 'react'

// const [data, setData] = useState({});
// useEffect(() => {
//       fetch(
//         'http://localhost:4000/',{
//             method: 'POST',
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 query:`
//                 query {
//                     categories{
//                         name
//                         products{
//                         name
//                     }
//                 }
//             }
//             `
//         })
//   })
//     .then(response => response.json())
//     .then((data => setData(data)));
// }, [])

// console.log(data.categories)
import React, { Component } from 'react'
import Navbar from './components/Navbar'

export default class App extends Component {
  render() {
    return (
      <>
        <Navbar/>
      </>
    )
  }
}

