function CardPopup(props) {

    const calcTime = () => {
        if (props.card.duration < 60) {
            return `${props.card.duration} мин`
        } else if (props.card.duration > 60) {
            return `${Math.floor(props.card.duration / 60)} ч ${props.card.duration % 60} мин`
        } else if (props.card.duration % 60 === 0) {
            return `${props.card.duration / 60} ч`
        }
    }

    return (
        <div className={`card-popup ${Object.keys(props.card).length!==0 && `card-popup_opened`}`}>
            <div className="card-popup__main">
                <img className="card-popup__image" src={props.card.image} alt={props.card.nameRU} />
                <div className="card-popup__list">
                    <p className="card-popup__element"><span className="card-popup__element__name">Название:</span> {props.card.nameRU}</p>
                    <p className="card-popup__element"><span className="card-popup__element__name">Name:</span> {props.card.nameEN}</p>
                    <p className="card-popup__element"><span className="card-popup__element__name">Страна производства:</span> {props.card.country}</p>
                    <p className="card-popup__element"><span className="card-popup__element__name">Год:</span> {props.card.year}</p>
                    <p className="card-popup__element"><span className="card-popup__element__name">Режиссер:</span> {props.card.director}</p>
                    <p className="card-popup__element"><span className="card-popup__element__name">Продолжительность:</span> {calcTime()}</p>
                </div>
                <p className="card-popup__description">{props.card.description}</p>
                {/* <button className="card-popup__close-button" onClick={props.closePopupButton} /> */}
            </div>
        </div>
    )
}

export default CardPopup;