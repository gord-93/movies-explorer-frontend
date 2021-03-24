import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Sidebar from '../Sidebar/Sidebar';

function App() {
    const [isSidebar, setSidebar] = React.useState(false);

    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <Header />
                    <Main />
                    <Footer />
                </Route>
                <Route exact path="/movies">
                    <Header setSidebar={setSidebar} />
                    <Movies />
                    <Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
                    <Footer />
                </Route>
                <Route exact path="/saved-movies">
                    <Header setSidebar={setSidebar} />
                    <SavedMovies />
                    <Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
                    <Footer />
                </Route>
                <Route exact path="/signup">
                    <Register />
                </Route>
                <Route exact path="/signin">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Header setSidebar={setSidebar} />
                    <Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
                    <Profile />
                </Route>
                <Route exact path="/error">
                    <Error />
                </Route>
            </Switch>
            
        </div>
    )
}


export default App;