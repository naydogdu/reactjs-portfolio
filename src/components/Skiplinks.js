import React from "react";

const Skiplinks = () => {
  const onFocus = () => document.body.classList.add('a11y')
  return <ul id="skip" aria-label="Accès rapide">
    <li><a href="#works" onFocus={onFocus} className="skip-link bold">Réalisations</a></li>
    <li><a href="#contact" className="skip-link bold">Contact</a></li>
  </ul>
}

export default Skiplinks;
