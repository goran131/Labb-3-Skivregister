import { ReactElement, FC } from 'react'
import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import css from '../pages/RecordPage.module.css'

const ImagePopup: FC<{imageUrl:string}> = ({ imageUrl}): ReactElement => {
   return (
      <>
         <Popup trigger={<img src={imageUrl} className={css.image} />} modal>
            {(close) => (
               <div className={css.imagePopup}>
                  <img src="/close-icon.webp" className={css.closePopup} onClick={close} />
                  <img src={imageUrl} className={css.bigImage} />
               </div>
            )}
         </Popup>
      </>
   )
}

ImagePopup.propTypes = { imageUrl: PropTypes.string }

export default ImagePopup
