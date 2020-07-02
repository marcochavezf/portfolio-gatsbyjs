import AnimationContainer from 'components/animation-container'
import BaffleText from 'components/baffle-text'
import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Tilt from 'react-tilt'
import { Flip, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ThemeContext from '../../context'
import './styles.scss'
class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    const { items } = this.props
    // const defaultCategory = null;
    const defaultCategory =  items[0].content.frontmatter.category;
    this.state = {
      // category: null, // show all categories
      category:defaultCategory ,
      col: this.getColPerCategory(items, defaultCategory),
      items: this.props.items,
      showPortfolio: false,
    }
    this.showPortfolio = this.showPortfolio.bind(this)
  }
  static contextType = ThemeContext

  notify({ title, link }){
    if (link) {
      Object.assign(document.createElement('a'), { target: '_blank', href: link}).click();
    } else {
      toast.dark(`Demo not available for ${ title }`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: 'toast-background',
        transition: Flip
      });
    }
  }

  showPortfolio() {
    this.setState({ showPortfolio: true })
  }

  render() {
    return (
      <section
        id={`${this.props.id}`}
        className="portfolio"
        style={{ height: this.context.height }}
      >
        <Row>
          <Col md={2} className="side">
            <h2>
              <BaffleText
                text="Projects"
                revealDuration={500}
                revealDelay={500}
                parentMethod={this.showPortfolio}
                callMethodTime={1100}
              />
            </h2>
          </Col>
          <Col md={10} className="recent-works">
            <div className="portfolio_selector">
              {/* <button
                className="portfolio_category"
                onClick={() => this.changeCategory(null)}
              >
                <span className={`${!this.state.category ? 'active' : ''}`}>
                  All
                </span>
              </button> */}
              {this.categories()}
            </div>

            <div className="content">
              <div
                className="portfolio_container"
                style={{
                  maxHeight:
                    this.context.height !== 'auto'
                      ? this.context.height * 0.8
                      : 'inherit',
                }}
              >
                {this.items()}
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </section>
    )
  }

  items() {
    if (this.state.showPortfolio || this.context.height === 'auto') {
      const { items } = this.state
      return items.map((value, index) => {
        const {frontmatter } = value.content;
        if (
          frontmatter.category === this.state.category ||
          !this.state.category
        ) {
          if (frontmatter.image) {
            return (
              <div
                className="portfolio_item"
                style={{
                  width:
                    this.context.height === 'auto'
                      ? '100%'
                      : this.state.col === 4
                      ? '25%'
                      : this.state.col === 3
                      ? '33.3%'
                      : this.state.col === 2
                      ? '50%'
                      : '100%',
                }}
                key={index}
              >
                <AnimationContainer delay={200} animation="fadeIn" key={index}>
                  <img
                    src={
                      frontmatter.image.childImageSharp.fluid.src
                    }
                    alt={value.content.frontmatter.title}
                    style={{
                      maxHeight: `${this.context.height *
                        (this.state.col >= 3
                          ? 0.35
                          : this.getItemCount(
                              value.content.frontmatter.category
                            ) === 4
                          ? 0.36
                          : 1)}px`,
                    }}
                  />
                  <Tilt className="Tilt" options={{ scale: 1, max: 50 }}>
                    <div className="overlay" onClick={() => this.notify(frontmatter)}>
                      <span className="title">
                        {frontmatter.title}
                      </span>
                      <span className="summary">
                        {frontmatter.summary}
                      </span>
                      <span className="technologies">
                        {frontmatter.technologies}
                      </span>
                    </div>
                  </Tilt>
                </AnimationContainer>
              </div>
            )
          }
        }
        return false
      })
    }
  }

  getItemCount(category) {
    let total = 0
    this.state.items.forEach(v => {
      if (v.content.frontmatter.category === category || !category) total++
    })
    return total
  }

  changeCategory(category) {
    const { items } = this.props
    this.setState({ items: [] })
    this.setState({ category: category, col: this.getColPerCategory(items, category) })
    setTimeout(() => {
      this.setState({ items: items })
    }, 50)
  }

  getColPerCategory(items, category) {
    let total = 0
    items.forEach(v => {
      if (v.content.frontmatter.category === category || !category) total++
    })
    let col = total > 6 ? 4 : total > 4 ? 3 : total > 3 ? 2 : total > 1 ? 2 : 1
    return col;
  }

  categories() {
    const { items } = this.props
    let categories = []
    for (var v of items) {
      categories.push(v.content.frontmatter.category)
    }
    categories = [...new Set(categories)]
    return categories.map((value, index) => {
      return (
        <button
          className="portfolio_category"
          onClick={() => this.changeCategory(value)}
          key={index}
        > 
          <span className={`${this.state.category === value ? 'active' : ''}`}>
            {value}
          </span>
        </button>
      )
    })
  }
}

export default props => (
  <StaticQuery
    query={graphql`
          query {
            items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(projects)/"}}, sort: {fields: [frontmatter___id], order: ASC}) {
              edges {
                content: node {
                  html
                  frontmatter {
                    id
                    title
                    category
                    technologies
                    summary
                    link
                    image {
                      childImageSharp {
                        fluid(maxWidth: 2000, maxHeight: 2000) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }      
        `}
    render={({ items }) => <Portfolio items={items.edges} {...props} />}
  />
)
