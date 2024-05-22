import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from 'react-final-form';
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";


const OglasDetailedChat = () => {
    const rootStore = useContext(RootStoreContext);
    const { createHubConnection, stopHubConnection, addComment, oglas } = rootStore.oglasStore;

    useEffect(() => {
        createHubConnection();
        return () => {
            stopHubConnection();
        }
    }, [createHubConnection, stopHubConnection])
    return (
        <Fragment>
            <Segment textAlign='center' attached='top' inverted color='teal' style={{ border: 'none' }}>
                <Header>Komentariši ovaj oglas</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {oglas && oglas.comments && oglas.comments.map((comment) => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={'/assets/user1.png'} />
                            <Comment.Content>
                                <Comment.Author>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createdAt}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                    <FinalForm
                        onSubmit={addComment}
                        render={({ handleSubmit, submitting, form }) => (
                            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                                <Field
                                name='text'
                                component={TextAreaInput}
                                rows={2}
                                placeholder='Dodaj svoj komentar'
                                 />
                                <Button 
                                content='Dodaj komentar' labelPosition='left' 
                                icon='edit' 
                                primary
                                loading={submitting} />
                            </Form>
                        )}
                    />
                </Comment.Group>
            </Segment>
        </Fragment>
    )
}

export default observer(OglasDetailedChat); 