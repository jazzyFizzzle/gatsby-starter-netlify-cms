import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import logo from '../img/proof-logo-black.svg'
import Layout from '../components/Layout'
import Features from '../components/Features'

export const IndexPageTemplate = ({
  image,
  mainpitch,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
        filter: 'grayscale(100%)'
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: 'black',
            lineHeight: '1',
            padding: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          <img className="banner-img" src={logo} alt="Kaldi" style={{ }} />
        </h1>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile" style={{textTransform: 'uppercase', textAlign: 'center', display: 'block'}}>
                    <h1 className="has-text-weight-semibold is-size-2">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    {/* {mainpitch.description} */}
                    <p>A small atisanal bakery that bakes breads and croissants made using stone-ground flour containing no additives or preservatives. </p>
                    <p>Baking bread using the old fashion ways and techniques, making use of slow rising with no proofers makes it extremely easy to digest bread packed with good gut microbes and probiotics. </p>
                    <p>Slow mixing and a minimum 12-hour fermentation allows for full flavour development, minimal oxidation (nutrient loss). All hand shaped, and baked at high temperatures for a beautiful crust, and moist crumb. </p>
                  </div>
                </div>
                <div className="columns">
                </div>
                <Features gridItems={intro.blurbs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
