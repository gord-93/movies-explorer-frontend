import MoviesCard from '../MoviesCard/MoviesCard';
import poster1 from '../../images/poster-1.png';
import { Route, Switch } from 'react-router';

function MoviesCardList() {
    return (
        <Switch>
            <Route exact path="/movies">
                <section className="movies-card-list">
                    <div className="movies-card-list__cards">
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                    </div>
                    <button className="movies-card-list__button" type="button">Ещё</button>
                </section>
            </Route>
            <Route exact path="/saved-movies">
            <section className="movies-card-list">
                    <div className="movies-card-list__cards movies-card-list__cards_place_saved-movies">
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                        <MoviesCard image={poster1} name="33 слова о дизайне" time="1ч42м"/>
                    </div>
                </section>
            </Route>
        </Switch>
    )
}

export default MoviesCardList;