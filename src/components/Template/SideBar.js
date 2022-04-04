import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Ziheng Xiao</h2>
        <p><a href="mailto:kratosxiao98@gmail.com">kratosxiao98@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m Ziheng Xiao. I like building things.
        I am a master&apos;s student at <a href="https://www.cc.gatech.edu/">Georgia Tech</a>,
        <a href="https://cuhk.edu.cn/"> CUHK Shenzhen</a> Alumni, and incoming SDE intern at
        <a href="https://www.amazon.com/"> Amazon</a>. Before that I was a software engineer at
        <a href="https://www.linkedin.com/in/fangde-liu-58261824/#experience"> Surgical AI</a>, product engineering intern at
        <a href="https://www.ubtrobot.com/?ls=en"> UBTECH Robotics</a>.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">&copy; Ziheng Xiao <Link to="/">kratosst.github.io</Link>.</p>
    </section>
  </section>
);

export default SideBar;
