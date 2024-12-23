"use client";
import { useState } from "react";
import Campaign from "./Campaign";
// import Modal from "./Modal";

interface Props {
  campaign: Record<string, string>;
}
export default function EditCampaign({ campaign }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Edit</button>
      <Campaign
        mode="Edit"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        campaignDetails={campaign}
      />
    </>
  );
}
