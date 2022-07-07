import { useState } from 'react';

import FeedbackOptions from './Feedback/FeedBack/Feedback';
import Section from './Feedback/Section/Section';
import Notifications from './Feedback/Notification/Notifications';
import Statistics from './Feedback/Statistics/Statistics';

const App = () => {
	const [state, setState] = useState({
		good: 0,
		neutral: 0,
		bad: 0
	});

	const onLeaveFeedback = (e) => {

	  setState((prevState) => {
		  return {
			...prevState,	
			[e]: prevState[e] + 1
			}
		});
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    const sum = good + neutral + bad;
    return sum;
  }
	
  const countPositiveFeedbackPercentage = () => {
	const sum = countTotalFeedback();
    const { good } = state;
    const positiveFeedback = (good * 100) / sum;
		return Math.round(positiveFeedback);
  }
	
	const { good, neutral, bad } = state;

    return (
			<div>
				<Section title="Please leave feedback">
					<FeedbackOptions options={Object.keys(state)} onLeaveFeedback={onLeaveFeedback} />
				</Section>

				{countTotalFeedback() === 0 ? (
					<Notifications message="No feedback given" />
				) : (
					<Section title="Statistics">
						<Statistics
							good={good}
							neutral={neutral}
							bad={bad}
							total={countTotalFeedback()}
							positivePercentage={countPositiveFeedbackPercentage()}
						/>
					</Section>
				)}
			</div>
		);
}


export default App;