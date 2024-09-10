import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Billetterie.css'

export default class Billetterie extends Component {
  render() {
    return (
      <div>
         <div className="errorstyle">
            <p className="errortitle">Rendez vous sur le site billetterie.com : </p>
            <Link to='billetterie.com'><button type="button" className="home_button">Billetterie</button></Link>
        </div>
      </div>
    )
  }
}
