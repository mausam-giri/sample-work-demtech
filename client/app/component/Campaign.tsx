"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import Modal from "./Modal";

const Modal = dynamic(() => import("./Modal"), {
  ssr: false,
});
import { createCampaign, updateCampaign } from "@/actions/campaign";

interface Props {
  mode: "Add" | "Edit";
  modalOpen: boolean;
  setModalOpen: (target: boolean) => void;
  campaignDetails?: Record<string, string>;
}

export default function Campaign({
  mode,
  modalOpen,
  setModalOpen,
  campaignDetails,
}: Props) {
  const [template, setTemplate] = useState<Record<string, string>[] | []>();
  const [userGroup, setUserGroup] = useState<Record<string, string>[] | []>();

  async function getMailTemplates() {
    try {
      const res = await fetch("http://localhost:5000/api/mail-template");

      if (res.ok) {
        const result = await res.json();
        setTemplate(result);
      }
    } catch (error) {
      console.error(error);
      //   alert("Something went wrong");
    }
  }

  async function getUserGroup() {
    try {
      const res = await fetch("http://localhost:5000/api/user-group");

      if (res.ok) {
        const result = await res.json();
        setUserGroup(result);
      }
    } catch (error) {
      console.error(error);
      //   alert("Something went wrong");
    }
  }

  useEffect(() => {
    getMailTemplates();
    getUserGroup();
  }, []);

  return (
    <>
      <Modal open={modalOpen} openChange={setModalOpen}>
        <div>
          <div className="mb-4 pb-1 border-b">
            <h2 className="font-medium text-xl">Create Campaign</h2>
          </div>
          <form
            action={async (formdata) => {
              if (mode == "Add") {
                const res = await createCampaign(formdata);
                if (res) {
                  alert("Campaign created successfully");
                  setModalOpen(false);
                } else {
                  console.error("Something went wrong");
                }
              }

              if (mode == "Edit") {
                if (!campaignDetails?.id) return;
                const res = await updateCampaign(formdata, campaignDetails?.id);
                if (res) {
                  alert("Campaign updated successfully");
                  setModalOpen(false);
                } else {
                  console.error("Something went wrong");
                }
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="campaign-name">Campaign Name</label>
                <input
                  name="campaign-name"
                  id="campaign-name"
                  placeholder="Enter campaign name"
                  defaultValue={campaignDetails?.name}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mail-template">Mailing Template</label>
                <select
                  name="mail-template"
                  id="mail-template"
                  required
                  defaultValue={campaignDetails?.templateId}
                >
                  <option value="-1" disabled selected>
                    Select template
                  </option>
                  {template?.map((temp, idx) => (
                    <option value={temp.id} key={idx}>
                      {temp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="user-group">User Group</label>
                <select
                  name="user-group"
                  id="user-group"
                  required
                  defaultValue={campaignDetails?.userGroupId}
                >
                  <option value="-1" disabled selected>
                    Select group
                  </option>
                  {userGroup?.map((group, idx) => (
                    <option value={group.id} key={idx}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="day-schedule">Schedule Date</label>
                <input
                  type="date"
                  name="day-schedule"
                  id="day-schedule"
                  required
                  defaultValue={campaignDetails?.scheduleDate}
                />
              </div>

              <div className="form-group">
                <label htmlFor="time-schedule">Schedule Time</label>
                <input
                  type="time"
                  name="time-schedule"
                  id="time-schedule"
                  required
                  defaultValue={campaignDetails?.scheduleTime}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button type="submit" className="bg-blue-500 text-white">
                Update Campaign
              </button>
              <button onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
