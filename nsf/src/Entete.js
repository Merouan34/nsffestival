import React from 'react'
import './App.css'


const Entete = ({titre}) => {
    return (
        <div class="section__padding_entete">
            <div>
                <div className="app__wrapper_info flex__center">
                    <h1 className="app__header-h1">{titre}</h1>
                </div>
            </div>
        </div>
    )
}

export default Entete
