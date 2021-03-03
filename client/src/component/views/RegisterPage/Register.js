import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action'
import {registerUser} from '../../../_action/user_action'
import { withRouter } from 'react-router-dom'
function Register(props) {

    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)

    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)

    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)

    }

    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)

    }

    const onSubmitHanlder = (event) =>{
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다');
        }
        let body ={
            'email': Email,
            'name': Name,
            'password': Password
        }

        
    dispatch(registerUser(body))
    .then(response => {
        if(response.payload.success){
            props.history.push('/login')
        }else{
            alert('Error');
        }
    })
    
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'  }}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHanlder}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}></input>

                <br/>
                <button>Sing Up</button>
            </form>
        </div>
    )
}

export default withRouter(Register)
