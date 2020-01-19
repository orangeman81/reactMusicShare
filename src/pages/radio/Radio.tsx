import { Subscription, iif, of } from 'rxjs';
import React, { Component } from 'react';
import Card from '../../components/Card/mediaCard';
import { AlbumsService } from '../../stores/appStore';
import { switchMap } from 'rxjs/operators';
import { AppState } from '../../stores/appState';
import { RadioI } from '../../models/radio'


class Radio extends Component {

    state = {
        data: []
    }

    sub: Subscription = new Subscription();

    componentDidMount() {
        this.sub = AlbumsService.$store
            .pipe(
                switchMap((state: AppState) => {
                    const $fetch = AlbumsService.$fetchRadio();
                    return iif(() => state.radio.length <= 0, $fetch, of(state))
                })
            )
            .subscribe((state: AppState) => this.setState({ data: state.radio }))
    }

    render() {
        return (
            <div>
                <main className="container">
                    <h1>Radio</h1>
                    <section className="row">
                        {
                            this.state.data.map((card: RadioI, i) => {
                                return <Card key={i} title={card.title} artist="Radio" image={card.picture_medium}>
                                </Card>
                            })
                        }
                    </section>
                </main>
            </div>
        );
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

}

export default Radio;
