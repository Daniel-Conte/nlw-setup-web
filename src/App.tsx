import "./styles/global.css";
import "./lib/dayjs";
import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";
import { api } from "./lib/axios";

window.navigator.serviceWorker
  .register("service-worker.js")
  .then(async (serviceWorker) => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      const publicKeyResp = await api.get("/push/public_key");

      subscription = await serviceWorker.pushManager.subscribe({
        applicationServerKey: publicKeyResp.data.publicKey,
        userVisibleOnly: true,
      });
    }

    await api.post("/push/register", { subscription });
    await api.post("/push/send", { subscription });
  });

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}

export default App;
