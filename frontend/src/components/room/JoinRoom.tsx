import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, useToast } from "@chakra-ui/react";
import BaseHelper                                                                                                         from "../../helpers/BaseHelper";
import { useState }                                                                                                       from "react";
import axios                                                                                                              from "axios";
import { JoinRoomState }                                                                                                  from "../../interfaces/RoomInterface";

const JoinRoom = () => {
    const toast = useToast();

    const [getState, setState] = useState<JoinRoomState>({
        roomUrl: '',
        password: ''
    });

    const joinRoom = () => {
        const url = BaseHelper.generateUrl('join-room');
        const formData = BaseHelper.buildFormData(getState);

        if (!getState.roomUrl) {
            toast({
                title: 'Ne morete se pridružiti sobi',
                description: 'Vpišite kodo sobe.',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        axios.post(url, formData)
            .then((res: any) => {
                window.location.pathname = `/soba/${res.data.RoomUrl}`;
            })
            .catch((error: any) => {
                toast({
                    title: 'Could not join room',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                });
            });

    }

    function checkKeyPress(event: any) {
        if (event.keyCode === 13) {
            joinRoom();
        }
    }

    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container>
                    <Stack spacing={4}>
                        <Heading>
                            Pridruži se sobi
                        </Heading>
                        <FormControl>
                            <FormLabel>
                                Koda Sobe *
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none"
                                                  children={<i className="far fa-hashtag"/>}
                                />
                                <Input placeholder='Koda sobe'
                                       type='text'
                                       name='roomUrl'
                                       value={getState.roomUrl}
                                       required
                                       onChange={event => BaseHelper.inputChange(event, setState, getState, 'roomUrl')}
                                       onKeyUp={checkKeyPress}
                                />
                            </InputGroup>
                            <FormLabel>
                                Geslo
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none"
                                                  children={<i className="far fa-lock"/>}
                                />
                                <Input placeholder='Geslo'
                                       type='password'
                                       name='password'
                                       value={getState.password}
                                       onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
                                       onKeyUp={checkKeyPress}
                                />
                            </InputGroup>
                        </FormControl>
                        <Button colorScheme='green'
                                variant='outline'
                                onClick={joinRoom}
                        >
                            Pridruži se sobi
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default JoinRoom;