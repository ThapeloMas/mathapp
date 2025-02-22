import Quiz from "../components/Quiz";

const Grade3 = ({ onRouteChange, user }) => {
  return (
    <div className="grade-page">
      <h1>Grade 3 Quiz</h1>
      <Quiz grade={3} onRouteChange={onRouteChange} user={user} />
    </div>
  );
};

export default Grade3;
