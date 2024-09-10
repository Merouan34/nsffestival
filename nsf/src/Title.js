import React from 'react'
import './Title.css'


const Title = ({texte}) => {
    return (
        <div class="section__padding_title">
            <div>
                <h3 className="app__header-h2">{texte}</h3>
            </div>
        </div>
    )
}

export default Title
