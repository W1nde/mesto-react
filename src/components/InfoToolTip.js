function InfoTooltip(props) {
  const { messageTooltip } = props;
  return (
    
    <div
      className={
        props.isOpen
          ? `popup popup_type_pic popup_type_opened`
          : `popup popup_type_pic`
      }
    >
      <div className='popup__overlay' onClick={props.onClose}></div>
      <div className='popup__content'>

        <img
          className='auth__pic'
          src={messageTooltip.img}
          alt={messageTooltip.message}
        ></img>

        <button
          className='popup__close'
          onClick={props.onClose}
          type="button"
        ></button>

        <h2 
          className='popup__title'>
          {messageTooltip.message}
        </h2>

      </div>
    </div>
  );
}

export default InfoTooltip;