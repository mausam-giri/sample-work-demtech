"use client";
import { deleteCampaign } from "@/actions/campaign";

interface Props {
  campaignId: string;
}
export default function DeleteCampaign({ campaignId }: Props) {
  async function handleCampaignDelete() {
    const res = await deleteCampaign(campaignId);
    if (res) {
      alert("Campaign deleted");
    } else {
      console.error("Something went wrong");
    }
  }
  return <button onClick={handleCampaignDelete}>Delete</button>;
}
