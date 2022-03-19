import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAvatarEdit (props) {
  const avatarInputRef = useRef();

  function submitHandler(evt) {
    evt.preventDefault();
    
    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })

    props.isClose();
  }

  React.useEffect(() => {
    avatarInputRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
        title="Обновить аватар"
        name="avatar-update"
        isOpen={props.isOpen}
        onClose={props.isClose}
        onSubmit={submitHandler}
    >

    <input
      id="url-avatar"
      type="url"
      name="avatar"
      placeholder="Ссылка на изображение"
      size="40"
      className="popup__input popup__input_type_avatar-url"
      ref={avatarInputRef}
      required
    />

    <span id="avatar-input-error" name="popup__span error"></span>
    <button type="submit" className="popup__save">Сохранить</button>

  </PopupWithForm>
  )
}
export default PopupAvatarEdit;