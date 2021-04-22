import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
    return (<section className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <Portfolio />
    </section>);
};

export default Main;