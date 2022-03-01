export const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }else if(!values.password){
     errors.password="Required"
    }else if(values.password.length<3){
     errors.password="must have between 8 and 16 characters, one digit, one lowercase and one uppercase. it cannot have other symbols"
    }
    return errors;
  };
