import React from 'react'
import PopUp from "./PopUp";
import {useRef} from 'react'

const Content = ({people,display,loading,error,lastPersonRef}) => {
    return (
        <div>
            {display &&
        people.length > 0 &&
        people.map((person, index) => (
          people.length === index + 1 ? 
            <div className="card" ref={lastPersonRef} key={person.id}>
              <PopUp person={person} />
            </div>
           :
            <div className="card" key={person.id}>
              <PopUp person={person} />
            </div>
            
          
        ))}

      {display && people.length === 0 && error && (
        <div className="text-center">No matching contact!!</div>
      )}
      <div>{loading && !error && "Loading...."}</div>
      
        </div>
    )
}

export default Content
