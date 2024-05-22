import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from 'react-final-form';
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";


const Poruka = () => {
    const rootStore = useContext(RootStoreContext);
    const { createHubConnection, stopHubConnection, addPoruka, porukica, poruke } = rootStore.korisnikStore;

    useEffect(() => {
        createHubConnection();
        return () => {
            stopHubConnection();
        }
    }, [createHubConnection, stopHubConnection])
    return (
        <Fragment>
            <div className = 'poruka' >
            <Segment textAlign='center' attached='top' inverted color='teal' style={{ border: 'none' }}>
                <Header>Pošalji poruku</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {porukica && poruke.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={'/assets/user1.png'} />
                            <Comment.Content>
                                <Comment.Author>{comment.userName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.vreme}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.sadrzaj}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                    <FinalForm
                        onSubmit={addPoruka}
                        render={({ handleSubmit, submitting, form }) => (
                            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                                <Field
                                name='text'
                                component={TextAreaInput}
                                rows={2}
                                placeholder='Dodaj svoju poruku'
                                 />
                                <Button 
                                content='Pošalji poruku' labelPosition='left' 
                                icon='edit' 
                                primary
                                loading={submitting} />
                            </Form>
                        )}
                    />
                </Comment.Group>
            </Segment>
            </div>
        </Fragment>
    )
}

export default observer(Poruka); 