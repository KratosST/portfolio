import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <Main
    title="Projects"
    description="Learn about Ziheng's projects."
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2 data-testid="heading"><Link to="/projects">Projects</Link></h2>
          <p>Click to see a simple demo if applicable</p>
        </div>
      </header>
      {/* <Link to="/demo">Demo</Link> */}
      {/* <a href={`${process.env.PUBLIC_URL}crime_map_demo.html`}> Demo</a> */}
      {/* <a href="crime_map_demo.html">Demo</a> */}
      {data.map((project) => (
        <Cell
          data={project}
          key={project.title}
        />
      ))}
    </article>
  </Main>
);

export default Projects;
