import Quiz from "../components/Quiz";

const Grade1 = ({ onRouteChange, user }) => {
  return (
    <div className="grade-page">
      <h1>Grade 1 Quiz</h1>
      <Quiz grade={1} onRouteChange={onRouteChange} user={user} />
    </div>
  );
};

export default Grade1;
