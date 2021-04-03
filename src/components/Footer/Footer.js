import { Route, Switch } from "react-router";

function Footer() {
    return (
        <Switch>
            <Route exact path={["/", "/movies", "/saved-movies"]}> 
                <footer className="footer">
                    <h6 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h6>
                    <div className="footer__container">
                        <p className="footer__copyright">&#169; 2021</p>
                        <div className="footer__links">
                            <a className="footer__link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                            <a className="footer__link" href="https://github.com/gord-93" target="_blank" rel="noreferrer">Github</a>
                            <a className="footer__link" href="https://www.facebook.com/profile.php?id=100005763606962" target="_blank" rel="noreferrer">Facebook</a>
                        </div>
                    </div>
                </footer>
            </Route>
        </Switch>
    )
}

export default Footer;