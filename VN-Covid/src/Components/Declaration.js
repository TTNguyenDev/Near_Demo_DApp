import React, { useRef, useState } from 'react';
import { Form, Container, Button, Row } from 'react-bootstrap';

const Declaration = (props) => {
    const name = useRef();
    const address = useRef();
    const [positive, setPositive] = useState(false);
    
    const submitToBlockchain = async () => {
        console.log(name.current.value);
        console.log(address.current.value);
        console.log(positive);

        await window.contract.addDeclaration({
            _name: name.current.value,
            _address: address.current.value,
            _isPos: positive
        });
    }

    return (
        <Container style={{ marginTop: '10px' }}>
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={name} placeholder='Enter Name'></Form.Control>
                </Form.Group>


                <Form.Group className='mb-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control ref={address} placeholder='Enter Address'></Form.Control>
                </Form.Group>
                <label style={{ justifyContent: 'center' }}><input checked={positive} onChange={() => setPositive(!positive)} type="checkbox" /> Is <b>positive</b> with Covid</label>   
                <Row style={{ margin: '5vh' }}>
                    <Button onClick={submitToBlockchain} variant='primary'>Submit</Button>
                </Row>
            </Form>
        </Container>
    );
    
};

export default Declaration;
