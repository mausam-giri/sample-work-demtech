import CreateCampaign from "./component/CreateCampaign";
import DeleteCampaign from "./component/DeleteCampaign";
import EditCampaign from "./component/EditCampaign";

async function getCampaign() {
  try {
    const res = await fetch("http://localhost:5000/api/get-campaigns");

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
export default async function Home() {
  const campaigns: Record<string, string>[] = await getCampaign();

  return (
    <div>
      <div className="wrapper mb-4">
        <div className="flex items-center justify-between">
          <div className="mt-5">
            <h2 className="text-xl">Mail Scheduling</h2>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>

      <div className="wrapper space-y-2">
        <div>
          <CreateCampaign />
        </div>
        <div>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th>Sl</th>
                <th>Campaign Name</th>
                <th>Scheduled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map((campaign, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{campaign.name}</td>
                  <td>{`${campaign.scheduleDate} @ ${campaign.scheduleTime}`}</td>
                  <td className="space-x-2">
                    <EditCampaign campaign={campaign} />
                    <DeleteCampaign campaignId={campaign.id} />
                  </td>
                </tr>
              ))}
              {!campaigns?.length && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
