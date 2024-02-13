import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import css from '../pages/RecordPage.module.css'

const ImagePopup = ({ imageUrl }) => {
    return (
        <>
            <Popup trigger={<img src={imageUrl} className={css.image} />} modal>
                {(close) => (
                    <div className={css.imagePopup}>
                        <button className={css.closePopup} onClick={close}>
                            &times;
                        </button>
                        <img src={imageUrl} className={css.bigImage} />
                    </div>
                )}
            </Popup>
        </>
    )
}

ImagePopup.propTypes = { imageUrl: PropTypes.string }

export default ImagePopup
