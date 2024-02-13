import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import css from './RecordPage.module.css'

const ImagePopup = ({ coverImage }) => {
    return (
        <>
            <Popup
                trigger={<img src={coverImage} className={css.image} />}
                modal
            >
                {(close) => (
                    <div className={css.imagePopup}>
                        <button className={css.closePopup} onClick={close}>
                            &times;
                        </button>
                        <img src={coverImage} className={css.bigImage} />
                    </div>
                )}
            </Popup>
        </>
    )
}

ImagePopup.propTypes = { coverImage: PropTypes.string }

export default ImagePopup
