import { DisputeProvider, useDispute } from './state/DisputeContext.jsx';
import { PrototypeNav } from './components/common.jsx';
import { WebsiteInstructions, Login, Home } from './screens/Entry.jsx';
import CreditReport from './screens/CreditReport.jsx';
import DisputeSection from './screens/DisputeSection.jsx';
import { TradelineForm, PersonalInfoForm, EnquiryForm } from './screens/DisputeForms.jsx';
import { Review, Confirmation, DisputeStatus } from './screens/Submission.jsx';

const SCREENS = {
  web: WebsiteInstructions,
  login: Login,
  home: Home,
  report: CreditReport,
  dispute: DisputeSection,
  tl: TradelineForm,
  pi: PersonalInfoForm,
  enq: EnquiryForm,
  review: Review,
  done: Confirmation,
  status: DisputeStatus,
};

function Router() {
  const { state } = useDispute();
  const Screen = SCREENS[state.screen] || WebsiteInstructions;
  return <Screen />;
}

// Set ?recentReport=1 in the URL to simulate a consumer who already pulled a report.
const hasRecentReport = new URLSearchParams(window.location.search).get('recentReport') === '1';

export default function App() {
  return (
    <DisputeProvider hasRecentReport={hasRecentReport}>
      <div style={{ minHeight: '100vh' }}>
        <PrototypeNav />
        <Router />
      </div>
    </DisputeProvider>
  );
}
