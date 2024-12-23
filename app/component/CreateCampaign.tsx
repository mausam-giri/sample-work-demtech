"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";

export default function CreateCampaign() {
  const [modalOpen, setModalOpen] = useState(false);
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
      <button onClick={() => setModalOpen(true)}>Add Campaign</button>
      <Modal
        open={modalOpen}
        openChange={setModalOpen}
        modalActionButton={<button>Add Campaign</button>}
      >
        <form action="">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="mail-template">Mailing Template</label>
              <select
                name="mail-template"
                id="mail-template"
                required
                className="form-select"
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
                className="form-select"
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="time-campaign">Schedule Time</label>
              <input
                type="time"
                name="time-campaign"
                id="time-campaign"
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
