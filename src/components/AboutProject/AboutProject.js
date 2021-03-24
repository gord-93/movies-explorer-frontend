function AboutProject() {
    return (
        <section className="about-project">
        <h2 className="main__title">О проекте</h2>
        <div className="about-project__container">
            <div className="about-project__about-elements">
                <div className="about-project__about-element">
                    <p className="about-project__element-title">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__element-text">Составление плана, 
                    работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__about-element">
                    <p className="about-project__element-title">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__element-text">У каждого этапа 
                    был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__progress">
                <div className="about-project__progress-column">
                    <p className="about-project__progress-time">1 неделя</p>
                    <p className="about-project__progress-name">Back-end</p>
                </div>
                <div className="about-project__progress-column">
                    <p className="about-project__progress-time about-project__progress-time_color_grey">4 недели</p>
                    <p className="about-project__progress-name">Front-end</p>
                </div>
            </div>
        </div>
        </section>
    );
};

export default AboutProject;