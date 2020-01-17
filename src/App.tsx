import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { debounceTime, distinctUntilChanged, switchMap, first, pluck } from 'rxjs/operators';
import React, { Component } from 'react';
import './App.scss';
import Navbar from './Navbar/navbar';
import Search from './Search/Search';
import Card from './Card/mediaCard'

class App extends Component {

  state = {
    data: [
      {
        title: "",
        preview: "",
        artist: {
          name: ""
        },
        album: {
          cover_medium: ""
        }
      }
    ],
    query: ""
  }

  $search: Subject<string> = new Subject();

  constructor(props: any) {
    super(props)
    this.$search
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(query => {
          const $search = ajax({
            url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
            method: "GET",
            headers: {
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              "x-rapidapi-key": "6d76812301mshae66073ae2beca5p1e12adjsnc9f2b3725389"
            }
          })
            .pipe(
              first(),
              pluck("response", "data")
            )
          return $search;
        })
      )
      .subscribe(res => {
        this.setState({
          data: res
        });
      })
  }

  addCard(card: any) {
    this.setState({
      ...this.state,
      data: [
        ...this.state.data,
        card
      ]
    })
  }

  searchInput = (event: any) => {
    this.$search.next(event.target.value);
  }

  render() {
    return (
      <div>
        <Navbar title="Music Share">
          <Search value="search" output={this.searchInput}></Search>
        </Navbar>
        <main>
          {
            this.state.data.map((card, i) => {
              return <Card key={i} title={card.title} artist={card.artist.name} media={card.album.cover_medium}>
              </Card>
            })
          }
          <button onClick={this.addCard.bind(this, { title: "new card", description: "new description" })}>new card</button>
        </main>
      </div>
    );
  }

}

export default App;
