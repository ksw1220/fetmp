import { useEffect, useState } from 'react';
import '../Styles/Form.css'
import axios from 'axios';

export default function SignIn() {
  const [id, setId] = useState()

  const postSignIn = () => {
    const body = {
      idToken: id,
      nickName : "abcd"
    }
    console.log(body)
    axios.post("http://localhost:8080/api/log-in", body)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("login", response.data.idToken);
        window.location.replace("/");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div className='main'>
      <div className='container'>
        <textarea
          className='textarea'
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id"
        />
        <button
          className='button'
          onClick={(e) => postSignIn()}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}