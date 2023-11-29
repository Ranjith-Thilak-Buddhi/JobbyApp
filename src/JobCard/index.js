/* eslint-disable camelcase */
import './index.css'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {jobDetails} = props
  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-container">
      <li className="jobs-item-container">
        <div className="company-logo-job-container">
          <img
            src={company_logo_url}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-name-rating-container">
            <h1 className="job-name">{title}</h1>
            <div className="rating-container">
              <FaStar className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-section-container">
          <div className="location-container">
            <IoLocationSharp className="middle-section-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="job-type-container">
            <BsBriefcaseFill className="middle-section-icon" />
            <p className="job-type">{employment_type}</p>
          </div>
          <p className="package">{package_per_annum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description-para">{job_description}</p>
      </li>
    </Link>
  )
}

export default JobCard
