/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import './index.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header/index'
import SimilarJobItem from '../SimilarJobItem/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {jobItemDetails: {}, jobItemApiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({jobItemApiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const request = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, request)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        jobItemDetails: data,
        jobItemApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobItemApiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemLoading = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemSuccess = () => {
    const {jobItemDetails} = this.state
    const {job_details, similar_jobs} = jobItemDetails
    const {
      company_logo_url,
      company_website_url,
      employment_type,
      job_description,
      skills,
      life_at_company,
      package_per_annum,
      rating,
      location,
      title,
    } = job_details
    const {description, image_url} = life_at_company

    return (
      <>
        <div className="job-item-details-container">
          <div className="job-item-company-logo-container">
            <img
              src={company_logo_url}
              alt="job details company logo"
              className="job-item-company-logo"
            />
            <div className="job-item-name-rating-container">
              <h1 className="job-item-name">{title}</h1>
              <div className="job-item-rating-container">
                <FaStar className="job-item-rating-icon" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-middle-section-container">
            <div className="job-item-location-container">
              <IoLocationSharp className="job-item-middle-section-icon" />
              <p className="job-item-location">{location}</p>
            </div>
            <div className="job-item-type-container">
              <BsBriefcaseFill className="job-item-middle-section-icon" />
              <p className="job-item-type">{employment_type}</p>
            </div>
            <p className="job-item-package">{package_per_annum}</p>
          </div>
          <hr />
          <div className="job-item-description-heading-link-container">
            <h1 className="job-item-description-heading">Description</h1>
            <a className="job-item-website-link" href={company_website_url}>
              Visit
              <FaExternalLinkAlt className="website-link-icon" />
            </a>
          </div>
          <p className="job-item-description-para">{job_description}</p>
          <h1 className="job-item-skills-heading">Skills</h1>
          <ul className="job-item-skills-container">
            {skills.map(eachItem => {
              const {image_url, name} = eachItem
              return (
                <li className="skill-item-container" key={name}>
                  <img className="skill-item-img" src={image_url} alt={name} />
                  <p className="skill-item-name">{name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              className="life-at-company-img"
              src={image_url}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similar_jobs.map(eachItem => (
            <SimilarJobItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItemFailure = () => (
    <div className="jobs-section-failure">
      <img
        className="jobs-section-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-section-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-section-failure-tag">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-section-retry-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItem = () => {
    const {jobItemApiStatus} = this.state

    switch (jobItemApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobItemLoading()
      case apiStatusConstants.success:
        return this.renderJobItemSuccess()
      case apiStatusConstants.failure:
        return this.renderJobItemFailure()
      default:
        return null
    }
  }

  render() {
    const {jobItemDetails} = this.state
    console.log(jobItemDetails)
    return (
      <>
        <Header />
        <div className="job-item-details-page">{this.renderJobItem()}</div>
      </>
    )
  }
}

export default JobDetails
