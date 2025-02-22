import Quiz from "../components/Quiz";

const Grade2 = ({ onRouteChange, user }) => {
  return (
    <div className="grade-page">
      <h1>Grade 2 Quiz</h1>
      <Quiz grade={2} onRouteChange={onRouteChange} user={user} />
    </div>
  );
};

export default Grade2;
