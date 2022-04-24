import { useEffect, useState } from 'react';
import '../Styles/Form.css'
import axios from 'axios';

export default function SignUp() {
  const [id, setId] = useState()
  const [nickName, setNickName] = useState()

  const postSignUp = () => {
    const body = {
      idToken: id,
      nickName: nickName,
    }
    console.log(body)
    axios.post("http://localhost:8080/api/sign-up", body)
      .then(function (response) {
        console.log(response);
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
        <textarea
          className='textarea'
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="nickname"
        />
        <button
          className='button'
          onClick={(e) => postSignUp()}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}