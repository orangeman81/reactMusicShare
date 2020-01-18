import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './leaves/leaves.scss';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';
import Albums from './pages/albums/Albums';
import Radio from './pages/radio/Radio';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AlbumsService } from './stores/appStore'

class App extends Component {

  sub: Subscription = new Subscription();
  $search: Subject<string> = new Subject();

  constructor(props: any) {
    super(props);
    this.sub = this.$search
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(query => {
          return AlbumsService.$fetchAlbums(query);
        })
      )
      .subscribe();
  }

  searchInput = (event: any) => {
    this.$search.next(event.target.value);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar title="Music Share">
              <li>
                <Search value="search" output={this.searchInput} />
              </li>
              <li>
                <Link to="/">Albums</Link>
              </li>
              <li>
                <Link to="/radio">Radio</Link>
              </li>
            </Navbar>
            <Switch>
              <Route path="/" exact>
                <Albums />
              </Route>
              <Route path="/radio" exact>
                <Radio />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }

}

export default App;
