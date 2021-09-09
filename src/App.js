import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [jobs, setJobs] = useState([]);
	const [value, setValue] = useState(0);

	async function fetchJobs() {
		const response = await fetch(url);
		const newJobs = await response.json();

		setJobs(newJobs);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchJobs();
	}, []);

	if (isLoading) {
		return (
			<section className="section loading">
				<h1>Loading...</h1>
			</section>
		);
	}

	const { company, dates, duties, title } = jobs[value];

	return (
		<section className="section">
			<div className="title">
				<h2>experience</h2>
				<div className="underline"></div>
			</div>

			<div className="jobs-center">
				{/* btn container */}
				<div className="btn-container">
					{jobs.map((item, index) => {
						return (
							<button
								className={`job-btn ${index === value && 'active-btn'}`}
								key={item.id}
								onClick={() => {
									setValue(index);
								}}
							>
								{item.company}
							</button>
						);
					})}
				</div>
				{/* job info */}
				<article className="job-info">
					<h3>{title}</h3>
					<h4>{company}</h4>
					<div className="job-date">{dates}</div>
					{duties.map((duty, index) => {
						return (
							<div className="job-description" key={index}>
								<FaAngleDoubleRight className="job-icon" />
								<p>{duty}</p>
							</div>
						);
					})}
				</article>
			</div>
		</section>
	);
}

export default App;
