import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to SmartRate</h1>
      <p className="mb-6">Your store rating solution — fast, secure, insightful.</p>
      <Link to="/login" className="bg-blue-500 text-white p-3 rounded mx-2">Sign In</Link>
      <Link to="/register" className="bg-green-500 text-white p-3 rounded mx-2">Register</Link>
    </div>
  );
}

export default Home;
