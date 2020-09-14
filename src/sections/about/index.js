import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Progress from 'components/progress';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Particles from 'react-particles-js';
import ThemeContext from '../../context';
import './styles.scss';

class Hero extends React.Component {

  static contextType = ThemeContext

  render() {
    return (
      <section id={`${this.props.id}`} className="about" style={{ height: this.context.height }}>
        {this.particles()}
        <Row>
          <Col md={6} className="content">
            <div className="content-text">
              <div className="line-text">
                <h4>About Me</h4>
              </div>
              <h3>I'm a Full Stack web developer</h3>
              {/* <h3>I'm a Full Stack web developer working from home</h3> */}
              {/* <div className="separator" /> */}
              <p>
              I've been coding for 15 years and I have 8 years of experience working on enterprise applications. I co-founded a startup company 6 years ago and in my spare time I like to build side projects that can provide value to other people.
              </p>
              <div className="line-text">
                <span>About my current job:</span>
              </div>
              <p>
              I'm working as sr. web developer in Primotus (a configurable workflow platform company) since March 2016, the technologies I use are Angular, AngularJs, Ionic v1, NgRx(Redux), Node.js, PostgreSQL, and a little bit of Scala. Some of my responsibilities are: maintain and redesign legacy code, create new modules (on my own or with the collaboration of my teammates), PR review, bring up to speed new team members, and manage Google Play and App Store apps for beta testing and production.
              </p>
              <div className="line-text">
                <span>About my (unsuccessful) startup company:</span>
              </div>
              <p>
              I co-founded an on-demand delivery company called Kangou and I was in charge of the technology (CTO). We were processing an average of 100 deliveries per day in Mexico City, we raised seed capital from angel investors and we were invited by the IDB to participate in the Demand Solutions program in Washington D.C.
              </p>
              {/* <div className="line-text">
                <span>Miscellaneous data about me:</span>
              </div>
              <p>
                The first programming languages I learned when I was a teenager were C++ (Using Borland C++) and Visual Basic, then during the next years of my career, I have been using different languages like Java, C, Ruby, Python, Clojure, F#, PHP, Lua, C#, Javascript/Typescript, and Scala. I consider myself a continuous learner and in my spare time I like to play music (I sing and play the guitar and bass), read non-fictional articles/books, and build fun side projects.
              </p> */}
              <div className="social social_icons">
                <FontAwesomeIcon icon={faGithub} className="social_icon" onClick={() => window.open('https://www.github.com/marcochavezf')} />
                <FontAwesomeIcon icon={faLinkedin} className="social_icon" onClick={() => window.open('https://mx.linkedin.com/in/marcochavezf')} />
              </div>
            </div>
          </Col>
          <Col md={6} className="skills">
            <div className="line-text">
              <h4>My Skills (in the last 5 years)</h4>
            </div>
            <div className="skills-container">
              <Progress name="Angular" value={95} delay={1100} />
              <Progress name="AngularJs & Ionic v1" value={100} delay={1100} />
              <Progress name="React" value={80} delay={1100} />
              <Progress name="Redux/NgRx" value={90} delay={1100} />
              <Progress name="Node.js" value={85} delay={1100} />
              <Progress name="SQL" value={80} delay={1100} />
              <Progress name="CSS/SCSS" value={80} delay={1100} />
              <Progress name="Scala & Play Framework" value={70} delay={1100} />
            </div>
            <span className="technologies">
            Programming languages/frameworks and technologies that I’ve used in previous projects:  Java (AndEngine), C, C++ (Cocos2dx), Ruby (Sinatra), Python, Clojure, F#, PHP, Lua (Corona), C# (Xamarin), Javascript/Typescript, Scala (Play), MongoDB, Firebase, MySQL, SQLite, PostgreSQL.
            </span>
          </Col>
        </Row>
      </section>
    )
  }

  particles() {
    return (
      <Particles
        className="particles"
        params={{
          "particles": {
            "number": {
              "value": 50,
              "density": {
                "enable": false,
                "value_area": 5000
              }
            },
            "line_linked": {
              "enable": true,
              "opacity": .5
            },
            "size": {
              "value": 1
            },
          },
          "retina_detect": true
        }} />
    )
  }

}

export default Hero