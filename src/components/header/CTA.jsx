import React from 'react'
import CV from '../about/about.css'

const CTA = () => {
  return (
    <div className="cta">
        <a href={CV} download className="btn">Download CV</a>
        <a href="#contacy" className="btn btn-primary">Let's Talk</a>
    </div>
  )
}

export default CTA