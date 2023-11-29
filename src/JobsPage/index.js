/* eslint-disable camelcase */
import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import JobCard from '../JobCard/index'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsPage extends Component {
  state = {
    salaryRange: '',
    employmentType: [],
    searchInput: '',
    jobsList: [],
    profileData: [],
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
    this.getProfileDetails()
  }

  getJobsDetails = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const {salaryRange, employmentType, searchInput} = this.state
    const employmentTypeQuery = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    console.log('fetched')

    if (response.ok) {
      const data = await response.json()
      this.setState({
        jobsList: data.jobs,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log('fetched')

    if (response.ok) {
      const data = await response.json()
      this.setState({
        profileData: data,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  redirect = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {profile_details} = profileData
    const {name, profile_image_url, short_bio} = profile_details

    return (
      <div className="profile-container">
        <img src={profile_image_url} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="short-bio">{short_bio}</p>
      </div>
    )
  }

  renderProfileLoading = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-failure-retry-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsList} = this.state

    if (jobsList.length !== 0) {
      return (
        <ul className="jobs-cards-container">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-tag">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsFailure = () => (
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
        We cannot seem to find the page your looking for
      </p>
      <button
        type="button"
        className="jobs-section-retry-button"
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  profileSection = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileLoading()
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoading()
      case apiStatusConstants.success:
        return this.renderJobsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  onInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.getJobsDetails()
  }

  onEmploymentChange = event => {
    const checkedValue = event.target.value
    const {employmentType} = this.state
    const value = employmentType.includes(checkedValue)
    if (value) {
      const newEmploymentTypeFilters = employmentType.filter(eachItem => {
        if (eachItem !== checkedValue) {
          return eachItem
        }
        return null
      })
      this.setState(
        {employmentType: newEmploymentTypeFilters},
        this.getJobsDetails,
      )
    } else {
      employmentType.push(checkedValue)
      this.setState({employmentType}, this.getJobsDetails)
    }
  }

  onSalaryFilterChange = event => {
    const filterValue = event.target.value
    this.setState({salaryRange: filterValue}, this.getJobsDetails)
  }

  employmentFilterSection = () => (
    <ul className="filters-list">
      {employmentTypesList.map(eachItem => {
        const {employmentTypeId, label} = eachItem

        return (
          <li className="filter-item" key={employmentTypeId}>
            <input
              id={employmentTypeId}
              type="checkbox"
              value={employmentTypeId}
              className="checkbox-input"
              onChange={this.onEmploymentChange}
            />
            <label htmlFor={employmentTypeId} className="filter-label">
              {label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  salaryFilterSection = () => (
    <ul className="filters-list">
      {salaryRangesList.map(eachItem => {
        const {salaryRangeId, label} = eachItem
        const {salaryRange} = this.state
        const isChecked = salaryRange === salaryRangeId

        return (
          <li className="filter-item" key={salaryRangeId}>
            <input
              id={salaryRangeId}
              type="radio"
              value={salaryRangeId}
              className="radio-input"
              checked={isChecked}
              onChange={this.onSalaryFilterChange}
            />
            <label htmlFor={salaryRangeId} className="filter-label">
              {label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  render() {
    const {searchInput, employmentType, salaryRange} = this.state
    console.log(employmentType)
    console.log(salaryRange)
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="profile-filters-section">
            {this.profileSection()}
            <hr className="profile-filters-horizontal-line" />
            <h1 className="filter-title">Type of Employment</h1>
            {this.employmentFilterSection()}
            <hr className="profile-filters-horizontal-line" />
            <h1 className="filter-title">Salary Range</h1>
            {this.salaryFilterSection()}
          </div>
          <div className="jobs-section">
            <div className="input-container">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                onChange={this.onInputChange}
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
