"use server";

import { revalidatePath } from "next/cache";

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
      //   const result = await resp.json();
      //   console.log(result);
      revalidatePath("/", "page");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}

export async function updateCampaign(formdata: FormData, campaignId: string) {
  try {
    const campaignData = {
      name: formdata.get("campaign-name"),
      templateId: formdata.get("mail-template"),
      userGroupId: formdata.get("user-group"),
      scheduleDate: formdata.get("day-schedule"),
      scheduleTime: formdata.get("time-schedule"),
    };

    const resp = await fetch(
      `http://localhost:5000/api/edit-campaign/${campaignId}`,
      {
        method: "POST",
        body: JSON.stringify(campaignData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.ok) {
      //   const result = await resp.json();
      //   console.log(result);
      revalidatePath("/", "page");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}

export async function deleteCampaign(campaignId: string) {
  try {
    const resp = await fetch(
      `http://localhost:5000/api/delete-campaign/${campaignId}`,
      {
        method: "POST",
      }
    );

    if (resp.ok) {
      //   const result = await resp.json();
      revalidatePath("/", "page");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error while creating campaign: ", error);
    return false;
  }
}
