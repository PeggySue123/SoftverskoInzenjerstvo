import React, { Component, useContext, useEffect, useState } from 'react'
import { Rating } from 'semantic-ui-react'
import { IProfile } from '../../app/models/profil'
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { IOcena } from '../../app/models/korisnik';

interface IProps {
    profile: IProfile;
}

const Ocena: React.FC<IProps> = ({ profile }) => {
    const [rating, setRating] = useState(0);
    const rootStore = useContext(RootStoreContext);
    const { addOcena, korisnik } = rootStore.korisnikStore;
    const ocena: IOcena | null = null;

    function handleChangeOnRate(e) {
        e.preventDefault();
        setRating(e.target.value);
        console.log(e.target.ariaPosInSet);
        const ocena: IOcena = {
            korisnikId: profile.id,
            ocenaValue: e.target.ariaPosInSet
        }
        addOcena(ocena);
    }
    return (
        <div>
            {
                profile ? (
                    <span>
                        <Rating rating={profile.ocena}
                            maxRating={5}
                            icon='star'
                            size='large'
                            onRate={(e) => {
                                handleChangeOnRate(e);
                            }}
                        />
                        <p>{profile.ocena}</p>
                    </span>

                ) : (
                    <p>Ne možete oceniti korisnika</p>
                )
            }

        </div>
    )
}

export default observer(Ocena)