import logo from '../../images/landing-logo.svg'

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <img className="promo__logo" src={logo} alt="Логотип Web-планета"></img>
                <div className="promo__column">
                    <h1 className="promo__title">Учебный проект студента факультета <br /> Веб-разработки.</h1>
                    <p className="promo__about">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <a className="promo__link" href="#portfolio">Узнать больше</a>
                </div>
            </div>
        </section>
    )
}

export default Promo;