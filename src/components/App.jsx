import { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [appState, setAppState] = useState(INITIAL_STATE);

  const onLeaveFeedback = state => {
    setAppState(prevState => ({
      ...prevState,
      [state]: prevState[state] + 1,
    }));
  };

  const countTotalfeedback = () => {
    return appState.good + appState.neutral + appState.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalfeedback();
    const positiveFeedback = (appState.good * 100) / total;
    return Math.round(positiveFeedback);
  };

  const { good, neutral, bad } = appState;
  const options = Object.keys(appState);
  return (
    <div>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title={'Statistic'}>
        {countTotalfeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalfeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
};
export default App;
