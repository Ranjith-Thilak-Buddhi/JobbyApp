/* eslint-disable camelcase */
import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similar-job-container">
      <div className="similar-job-company-logo-container">
        <img
          src={company_logo_url}
          alt="similar job company logo"
          className="similar-job-company-logo"
        />
        <div className="similar-job-name-rating-container">
          <h1 className="similar-job-name">{title}</h1>
          <div className="similar-job-rating-container">
            <FaStar className="similar-job-rating-icon" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description-para">{job_description}</p>
      <div className="similar-job-middle-section-container">
        <div className="similar-job-location-container">
          <IoLocationSharp className="similar-job-middle-section-icon" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-type-container">
          <BsBriefcaseFill className="similar-job-middle-section-icon" />
          <p className="similar-job-type">{employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
