"use server";

export async function createCampaign(formdata: FormData) {
  try {
    const campaignData = {
      name: formdata.get("campaign-name"),
      templateId: formdata.get("mail-template"),
      userGroupId: formdata.get("user-group"),
      scheduleDate: formdata.get("day-schedule"),
      scheduleTime: formdata.get("time-schedule"),
    };

    const resp = await fetch("http://localhost:5000/api/create-campaign", {
      method: "POST",
      body: JSON.stringify(campaignData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
      const result = await resp.json();
      console.log(result);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}
