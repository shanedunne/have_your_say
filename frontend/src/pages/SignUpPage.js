import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import handleSignUp from '../services/api'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function SignUpPage() {
    // create states for form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [postcode, setPostcode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accessCode, setAccessCode] = useState("");

    // state for error message
    const [error, setError] = useState("")

    // get the history object
    const histpry = useNavigate();

    const configureSignUp = async () => {
        try {
            if (!firstName || !lastName || !dateOfBirth || !email || !postcode || !password || !confirmedPassword || !phoneNumber || !accessCode) {
                setError("Please fill in all form fields");
                return;
            }

            // ensure password and confirmation are the same
            if (password !== confirmedPassword) {
                throw new Error("Passwords do not match");
            }

            // call axios post request
            handleSignUp(firstName,
                lastName,
                dateOfBirth,
                email,
                postcode,
                password,
                confirmedPassword,
                phoneNumber,
                accessCode);


        } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
        return (
            <Container>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridDateOfBirth">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control placeholder="DD-MM-YYYY" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Enter email address" />
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPostCode">
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control type="text" placeholder="Enter postcode" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter password" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="text" placeholder="Confirm password" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAccessCode">
                            <Form.Label>Access Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter access code" />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                );
            </Container>
        )
    }
} export default SignUpPage;