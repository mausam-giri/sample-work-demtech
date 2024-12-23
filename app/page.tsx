import CreateCampaign from "./component/CreateCampaign";

export default function Home() {
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
          {/* <button>+ Add Campaign</button> */}
          <CreateCampaign />
        </div>
        <div>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th>Sl</th>
                <th>Campaign Name</th>
                <th>Scheduled Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="text-center">
                  No Record Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
