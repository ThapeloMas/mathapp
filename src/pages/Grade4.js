import Quiz from "../components/Quiz";

const Grade4 = ({ onRouteChange, user }) => {
  return (
    <div className="grade-page">
      <h1>Grade 4 Quiz</h1>
      <Quiz grade={4} onRouteChange={onRouteChange} user={user} />
    </div>
  );
};

export default Grade4;
