import React from "react";
import logoPath from '../images/header-logo.svg'

function Header() {
    return (
        <header className="header">
            <img src={logoPath} className="header__logo" alt="Логотип" />
        </header>
    )
}

export default Header;