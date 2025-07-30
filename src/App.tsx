import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TransferPage from "./pages/TransferPage";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { WithdrawPage } from "./pages/WithdrawPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { TransactionHistoryPage } from "./pages/TransactionHistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/transactionHistoryPage"
            element={<TransactionHistoryPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
