import { Button, Container, Flex, Heading, Input, InputGroup, Stack, useToast } from "@chakra-ui/react";
import { Link }                                                                 from "react-router-dom";
import BaseHelper                                                               from "../helpers/BaseHelper";
import axios                                                                    from "axios";
import { useState }                                                             from "react";
import { RegisterState }                                                        from "../interfaces/RegisterInterface";

const Register = () => {
    const toast = useToast();
    const [getState, setState] = useState<RegisterState>({
        email: '',
        name: '',
        password: '',
        username: ''
    });

    const register = () => {
        const url = BaseHelper.generateUrl('register');
        const formData = BaseHelper.buildFormData(getState);

        axios.post(url, formData)
            .then(response => {

            })
            .catch((error: any) => {
                toast({
                    title: 'Could not register',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                })
            });
    }

    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Registriraj se</Heading>
                        <InputGroup>
                            <Input placeholder="Ime"
                                   type="text"
                                   name="name"
                                   value={getState.name}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'name')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Email"
                                   type="email"
                                   name="name"
                                   value={getState.email}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'email')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Uporabniško ime"
                                   type="text"
                                   name="username"
                                   value={getState.username}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'username')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Geslo"
                                   type="password"
                                   name="password"
                                   value={getState.password}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
                            />
                        </InputGroup>
                        <Button colorScheme="green"
                                variant="outline"
                                onClick={register}
                        >
                            Registracija
                        </Button>
                        <Link to="/login">
                            <Button colorScheme="red"
                                    variant="outline"
                                    w="100%"
                            >
                                Že registriran?
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Register;