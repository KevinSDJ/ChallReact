import React from 'react';
import { Container, Row, Col,ButtonGroup,Button} from 'react-bootstrap';
import './footer.scss';






export default function Footer(){
  
  return (
    <Container id="footerContainer" fluid>
  <Row className="flexFirstRow">
    <Col><ButtonGroup id="buttonGroupFooter" aria-label="Basic example">
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup></Col>
  </Row>
  <Row className="justify-content-md-center">
    <Col>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div></Col>
  </Row>
</Container>
  )
}




















