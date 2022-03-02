import React,{useState,useContext,useEffect}from 'react';
import {Form,Button,FloatingLabel,Alert,Image} from 'react-bootstrap';
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
           <Image src="https://dsm01pap002files.storage.live.com/y4m4ZvTnU-BhxDBxrG_gzQN0qAqdLLYipN_VVJAl_ii-qYR0Af7B1Epum6pGp5Qi7zdag9I_bH6cuDTkdYLpadYzcw0bk5dEiy7SGJQ7qBK52Vk3eEctNwXGiYwZLi_92NIMR4hdqXgzJ5v97CGK77-2ipHGSNdhDOB175xH2OBZKflZdl5t3WbUCIg4iMGWFhW?width=996&height=995&cropmode=none" style={{width:"60px",margin:'0 auto'}} fluid/>
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