import React, { useContext, useEffect, useState } from "react";
import { Segment, Form, Button, Grid} from "semantic-ui-react";
import { IOglas, OglasFormValues } from '../../../app/models/oglas';
import { v4 as uuid } from 'uuid';
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import NumberInput from '../../../app/common/form/NumberInput';
import BoolInput from '../../../app/common/form/BoolInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { tipovi } from '../../../app/common/options/tipoviOptions';
import { polTipovi } from '../../../app/common/options/polOptions';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate';

const validate = combineValidators({
    naslov: isRequired({ message: 'Polje je obavezno!' }),
    opis: composeValidators(
        isRequired({ message: 'Polje je obavezno!' }),
        hasLengthGreaterThan(3)({ message: 'Ovo poljke mora da sadrži bar 4 karaktera!' })
    )(),
    lokacija: isRequired({ message: 'Polje je obavezno!' }),
    vrsta: isRequired({ message: 'Polje je obavezno!' }),
    rasa: isRequired({ message: 'Polje je obavezno!' }),
    pol: isRequired({ message: 'Polje je obavezno!' }),
    boja: isRequired({ message: 'Polje je obavezno!' }),
    tip_Oglasa: isRequired({ message: 'Polje je obavezno!' })
})

interface DetailParams {
    id: string;
}

const OglasForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const rootStore = useContext(RootStoreContext);
    const {
        kreirajOglas,
        editOglas,
        submitting,
        loadOglas
    } = rootStore.oglasStore;

    const [oglas, setActivity] = useState(new OglasFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadOglas(match.params.id).then(
                (oglas) => setActivity(new OglasFormValues(oglas))
            ).finally(() => setLoading(false));
        }
    }, [loadOglas, match.params.id]);

    const handleFinalFormSubmit = (values: any) => {
        const file =document.getElementById('file')['files'][0] 
        const { date, ...oglas} = values;
        if (!oglas.id) {
            let newOglas: IOglas = {
                ...oglas,
                id: uuid(),
                file
            };

            newOglas.dateTime = new Date().toISOString();

            kreirajOglas(newOglas);
            console.log(values);
        }
        else {
            editOglas(oglas);
        }
    }


    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing >
                    <FinalForm validate={validate} initialValues={oglas} onSubmit={handleFinalFormSubmit} render={({ handleSubmit, invalid, pristine }) => {
                        return (
                            <Form loading={loading} onSubmit={handleSubmit}>
                                <Field name='naslov' placeholder='Naslov' value={oglas.naslov} component={TextInput} 
                                 inputOnChange={(e)=>{oglas.naslov = e.target.value;}}/>
                                <Field name='opis' placeholder='Opis' value={oglas.opis} component={TextAreaInput} 
                                 inputOnChange={(e)=>{oglas.opis = e.target.value;}}/>
                                <Field 
                                    component={TextInput} 
                                    name='lokacija' 
                                    placeholder='Lokacija' 
                                    value={oglas.lokacija} 
                                    inputOnChange={(e)=>{oglas.lokacija = e.target.value;}}
                                />
                                <Field component={TextInput} name='vrsta' placeholder='Vrsta' value={oglas.vrsta} 
                                inputOnChange={(e)=>{oglas.vrsta = e.target.value;}}/>
                                <Field component={TextInput} name='rasa' placeholder='Rasa' value={oglas.rasa} 
                                inputOnChange={(e)=>{oglas.rasa = e.target.value;}}/>
                                <Field component={SelectInput}
                                    options={polTipovi} name='pol' placeholder='Pol' value={oglas.pol}
                                    inputOnChange={(e)=>{oglas.pol = e.target.value;}}/>
                                <Field component={TextInput} name='boja' placeholder='Boja' value={oglas.boja} 
                                inputOnChange={(e)=>{oglas.boja = e.target.value;}}/>
                                <Field component={NumberInput} name='starost' placeholder='Starost' value={oglas.starost} 
                                inputOnChange={(e)=>{oglas.starost = e.target.value;}}/>
                                <Field component={BoolInput} type="checkbox" name='Vakcinisan' value={oglas.vakcinisan} />
                                <Field component={BoolInput} type="checkbox" name='Sterilisan' value={oglas.sterilisan} />
                                <Field component={BoolInput} type="checkbox" name='Ima papire' value={oglas.papiri} />
                                <Field component={SelectInput}
                                    options={tipovi} name='tip_Oglasa' placeholder='Tip oglasa' value={oglas.tip_Oglasa}
                                    inputOnChange={(e)=>{oglas.tip_Oglasa = e.target.value;}}/>
                                <div>
                                    {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => {
                                        setActivity(new OglasFormValues({ ...oglas, slike:[ base64] }))
                                }} /> */}
                                <input id="file" type="file" name='file' />
                                </div>
                                <Button className='dugmedodaj' loading={submitting}
                                    disable={loading || invalid || pristine} floated='right' positive type='submit' content='Dodaj' />
                                <Button
                                    className='dugmeotkazi'
                                    onClick={oglas.id ? () => history.push(`/oglasi/${oglas.id}`) : () => history.push('/oglasi')}
                                    disabled={loading}
                                    floated='right'
                                    type='button'
                                    content='Otkaži'
                                />
                            </Form>
                        )
                    }} />
                </Segment>
            </Grid.Column>
        </Grid>
    )

}

export default observer(OglasForm);