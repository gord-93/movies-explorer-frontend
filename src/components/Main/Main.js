import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
    return (<div className="main">
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <Portfolio />
        <Footer />
    </div>);
};

export default Main;