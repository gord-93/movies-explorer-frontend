import avatar from '../../images/avatar.jpg';
import arrow from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <h4 className="main__title">Студент</h4>
            <div className="portfolio__container">
                <img className="portfolio__photo" src={avatar} alt="Моё фото"></img>
                <div className="portfolio__info">
                    <p className="portfolio__name">Иван</p>
                    <p className="portfolio__job">Фронтенд-разработчик, 28 лет</p>
                    <p className="portfolio__text">
                    Я живу в городе Наро-Фоминск, закончил факультет юриспруденции ИВЭСЭП. Женат. Увлекаюсь прохождением
                    видеоигр, просмотром YouTube, люблю слушать музыку и помечтать. Во всем ценю уважение к мелочам. На данный момент прохожу курс
                    по веб-разработке от Яндекс.Практикума. Хочу стать отличным специалистом в этом направлении и делать крутые проекты!
                    </p>
                    <div className="portfolio__links">
                        <a className="portfolio__link" href="https://www.facebook.com/profile.php?id=100005763606962" target="_blank" rel="noreferrer">Facebook</a>
                        <a className="portfolio__link" href="https://github.com/gord-93" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </div>
            </div>
            <p className="portfolio__subtitle">Портфолио</p>
            <div className="portfolio__elements">
                <a className="portfolio__element" href="https://github.com/gord-93/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт <img className="portfolio__arrow" src={arrow} alt="Стрелка"></img></a>
                <a className="portfolio__element" href="https://github.com/gord-93/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт <img className="portfolio__arrow" src={arrow} alt="Стрелка"></img></a>
                <a className="portfolio__element" href="https://github.com/gord-93/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение <img className="portfolio__arrow" src={arrow} alt="Стрелка"></img></a>
            </div>
        </section>
    );
};

export default Portfolio;