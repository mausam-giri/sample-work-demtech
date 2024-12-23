"use client";

import { useState } from "react";
import Campaign from "./Campaign";

export default function CreateCampaign() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Add Campaign</button>
      <Campaign mode="Add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
