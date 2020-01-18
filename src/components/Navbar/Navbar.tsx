import React from 'react';

const Navbar: React.FC<{ title: string, children: any }> = ({ title, children }) => {
    return (
        <nav>
            <a href="/">{title}</a>
            <ul>{children}</ul>
        </nav>
    )
};

export default Navbar;