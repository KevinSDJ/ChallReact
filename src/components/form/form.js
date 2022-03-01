import React,{useState,useContext,useEffect}from 'react';
import {Form,Button,FloatingLabel,Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.scss';
import { validate } from '../../utilities/validate';
import {GlobalContext} from '../../contextGlobal/context'
import {setUser,checkSession,clearError} from '../../contextGlobal/actions'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
 
 
 const SingInForm = () => {
    const [inputs,setInputs]= useState({
        email:'',
        password:''
    })
    const [err,setErrors]= useState({})
    let {state,dispatch}= useContext(GlobalContext)
    let {login}=state
    let {errors}=state
    let nagivate= useNavigate()
    const handleSubmit= (e)=>{
        e.preventDefault()
        setUser(inputs,dispatch)

    }
    useEffect(()=>{
        if(errors){
            swal({
                title: "Error",
                text:`${errors.error}` ,
                icon: "error",
                dangerMode: true,
            })
            .then(re=>{
                clearError(dispatch)
            })

        }

    },[dispatch, errors])

    useEffect(()=>{
        if(login){
             swal({
                title: "OK",
                text:`Login Success` ,
                icon: "success",
                successMode: true,
            })
            .then(re=>{
                  nagivate('/')
            })
        }
        if(!login&&localStorage.getItem('sessionRecipe')){
            checkSession(dispatch)
        }
    },[dispatch, login, nagivate])
    const handleChange=(e)=>{
        setInputs(prev=>{
            setErrors(validate({...prev,[e.target.name]:e.target.value}))
            return {...prev,[e.target.name]:e.target.value}
        })
    }
   return (
    <div id="formConteiner">
       <Form onSubmit={handleSubmit} id="form">
           <h3 id="LoginTitle">Welcome back</h3>
           <Form.Group
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
             <FloatingLabel
             controlId="floatingInput"
             label="Email"
             className="mb-3"
             >
             <Form.Control
                  type="email"
                  placeholder="email"
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  isInvalid={!!err.email}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {err.email}
                </Form.Control.Feedback>
                {!err.email&&inputs.email?<Alert key={"alert"}  variant='success'>
                    Email ok
                </Alert>:null}
                </FloatingLabel>
            </Form.Group>
            <Form.Group
              md="4"
              controlId="validationFormik101"
              className="position-relative"
            >
             <FloatingLabel
             controlId="floatingInput2"
             label="Password"
             className="mb-3"
             >
             <Form.Control
                  type="password"
                  placeholder="password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  isInvalid={!!err.password}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {err.password}
                </Form.Control.Feedback>
                {!err.password&&!err.email&&inputs.password?<Alert key={"alert"} variant='success'>
                    Password ok
                </Alert>:null}
                </FloatingLabel>
            </Form.Group>
            {login?<Button type='submit'  disabled>Singup</Button>:<Button variant="primary" type='submit'>Singup</Button>}
       </Form>
       </div>
        )
 };
 export default SingInForm