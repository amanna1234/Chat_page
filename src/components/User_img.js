import React from 'react';
import userimgcss from "./User_img.css"

export default function User_img(props) {
  return (
    <div className="Chat_recipient_img" style={{background:props.user == "Alan"? "red" : props.user == "Bob" ? "blue" : props.user == "Carol" ? "green" : props.user == "Dean"? "orange" : "yellow"}}>
    {props.user.slice(0, 2)}
   </div>
  )
}
