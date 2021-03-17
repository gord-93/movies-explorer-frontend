import avatar from '../../images/avatar.png';
import arrow from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <h4 className="main__title">Студент</h4>
            <div className="portfolio__container">
                <img className="portfolio__photo" src={avatar} alt="Моё фото"></img>
                <div className="portfolio__info">
                    <p className="portfolio__name">Виталий</p>
                    <p className="portfolio__job">Фронтенд-разработчик, 30 лет</p>
                    <p className="portfolio__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                    У меня есть жена 
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал 
                    в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
                    и ушёл с постоянной работы.</p>
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