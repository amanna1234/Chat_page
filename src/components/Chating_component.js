import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import Chatingcss from "./Chating_component.css";
import User_img from "./User_img";

export default function Chating_component() {
  const [Chats, setChats] = useState([]);
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];   //user_names
  const input_element = useRef();  //input element reference
  const member_list_elem = useRef();  //user names list reference
  const emoji_elem = useRef();   //emoji container reference
let current_time = new Date()


  // runs when send icon clicked
  const Chat_state_handler = () => {
    if (input_element.current.value != "") {
      let arr = [...Chats];
      arr.unshift({
        message: input_element.current.value,
        user: user_list[Math.floor(Math.random() * 5)],
        likes: 0,
        hour : current_time.getHours(),
        minutes : current_time.getMinutes()
      });
      input_element.current.value = "";
      member_list_elem.current.style.display = "none";
      setChats(arr);
    }
  };


  // runs when input value changes
  const input_change_handler = (e) => {
    if (
      e.target.value == "@" ||
      e.target.value.slice(e.target.value.length - 2) == " @"
    ) {
      console.log("mention");
      member_list_elem.current.style.display = "flex";
    } else {
      member_list_elem.current.style.display = "none";
    }
  };

  // run when like icon is clicked
  const like_handler = (index) => {
    let arr = [...Chats];
    arr[index].likes = arr[index].likes + 1;
    setChats(arr);
  };

  // runs when emoji in input field is pressed
  const emoji_display_handler = () => {
    if (emoji_elem.current.style.display == "none") {
      emoji_elem.current.style.display = "block";
      } else {
      emoji_elem.current.style.display = "none";
       }
  };

  // runs when a emoji is selected
  const emoji_picker = (Emoji) => {
    input_element.current.value = input_element.current.value + Emoji.emoji;
  };

  // runs when we clicked a user name on list
  const members_mention_handler = (name) => {
    input_element.current.value = input_element.current.value + name + " ";
    member_list_elem.current.style.display = "none";
  };

  useEffect(() => {
    emoji_elem.current.style.display = "none";
  }, []);


  return (
    <div className="container_main">
      <div className="container_child">


        {/* top bar */}
        <div className="Chating_group_top_bar">
          <i className="bi bi-arrow-left"></i>
          <div className="groug_img">FG</div>
          <div className="group_name">Friends chating group</div>
        </div>
        {/* top bar section end here */}

        {/* bottom bar */}
        <div className="Chating_group_bottom_bar">
          <input
            type="text"
            placeholder="Message"
            ref={input_element}
            onChange={input_change_handler}
          />
          <i
            className="bi bi-emoji-smile emoji_icon"
            onClick={emoji_display_handler}
          ></i>
          <i
            className="bi bi-send-fill send_icon"
            onClick={Chat_state_handler}
          ></i>
          <div className="members_list_container" ref={member_list_elem}>
            {user_list.map((item, index) => {
              return (
                <div
                  className="members_list"
                  onClick={() => members_mention_handler(item)}
                  key={index}
                >
                  <User_img user={item} />
                  <div className="member_name">{item}</div>
                </div>
              );
            })}
          </div>
          <div className="emoji_container" ref={emoji_elem}>
            <EmojiPicker height={350} onEmojiClick={emoji_picker} />
          </div>
        </div>
        {/* bottom bar section ends here */}

        {/* messeges section */}
        <div className="Chat_conversation_container">
          {Chats.map((item, index) => {
            return (
              <div key={index} className="Individual_chat_container">
                <User_img user={item.user} />
                <div className="Chat_recipient_name_message">
                  <div className="name_time_container">
                  <div className="Chat_recipient_name">{item.user}</div>
                  <div className="Chat_time">{item.hour}:{item.minutes}</div>
                   </div>
                  <div className="chat_message_like_container">
                    <div className="chat_message">{item.message}</div>

                    {item.likes == 0 && (
                      <i
                        className="bi bi-hand-thumbs-up like_btn"
                        onClick={() => like_handler(index)}
                      ></i>
                    )}

                    {item.likes > 0 && (
                      <i
                        className="bi bi-hand-thumbs-up-fill like_btn"
                        onClick={() => like_handler(index)}
                      ></i>
                    )}

                    {item.likes > 0 && (
                      <div className="like_count">{item.likes}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
       {/* message section ends here */}

      </div>
    </div>
  );
}
