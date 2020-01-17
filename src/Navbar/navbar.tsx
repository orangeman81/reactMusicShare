import React from 'react';
import './Navbar.scss'

const Navbar: React.FC<{ title: string, children: any }> = ({ title, children }) => {
    return (
        <nav className="mainNav">
            <h1>{title}</h1>
            <span>{children}</span>
        </nav>
    )
};

export default Navbar;