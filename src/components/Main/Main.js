import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
    return (<div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <Portfolio />
    </div>);
};

export default Main;